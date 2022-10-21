'use strict'
const Repasse = use('App/Models/Repasse')
const Database = use("Database");
class RepasseController {
    async criarRepasse({request,response}){
        let retorno = ""
        const dadosRequest = request.only(['protocolo','funcionariodestino','setor','uid','empresa'])
        
        const userc = await Database.select("funcionario_empresas.*","funcionarios.nome as nome_funcionario")
            .table("funcionario_empresas")
            .innerJoin('funcionarios','funcionarios.id','funcionario_empresas.funcionario')
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        const protocolo = await Database.select("*")
            .table("protocolos")
            .where("id",dadosRequest.protocolo)

        if (userc.length === 0) {
            response?.status(404)
            retorno = {erro:{codigo:100,msg:'Usuario não encontrado ou não vinculado a empresa para repassar protocolo'}}
        }else{
            //Caso o funcionário de destino seja 0 o protocolo será enviado para fila de espera
            if(dadosRequest.funcionariodestino === 0 && dadosRequest.setor !== null && dadosRequest.setor !== undefined){
                
                retorno = await Repasse.create({
                    funcionarioatual: protocolo[0].atendente,
                    protocolo: dadosRequest.protocolo,
                    funcionariodestino: null,
                    userc: userc[0].funcionario,
                    empresa: userc[0].empresa,
                    setor: dadosRequest.setor
                });

                await Database
                    .table('protocolos')
                    .update('atendente', null)
                    .update('setor', dadosRequest.setor)
                    .update('userm',userc[0].funcionario)
                    .where('id', dadosRequest.protocolo)

                await Database
                .table('observacoes')
                .insert({
                    protocolo: dadosRequest.protocolo,
                    atendente: userc[0].funcionario,
                    observacao: userc[0].nome_funcionario + " passou o protocolo para fila",
                    empresa: userc[0].empresa
                })

            }else {
                const user_destino = await Database.select("funcionario_empresas.*","funcionarios.nome as nome_funcionario")
                .table("funcionario_empresas")
                .innerJoin('funcionarios','funcionarios.id','funcionario_empresas.funcionario')
                .where("funcionario", dadosRequest.funcionariodestino)
                .where("empresa", dadosRequest.empresa)
                .whereNotNull("setor");
            
                if (user_destino.length === 0) {
                    response?.status(404)
                    retorno = {erro:{codigo:101,msg:'Funcionário de destino não encontrado ou não vinculado a empresa para repassar protocolo'}}
                }else{

                    retorno = await Repasse.create({
                        funcionarioatual: protocolo[0].atendente,
                        protocolo: dadosRequest.protocolo,
                        funcionariodestino: user_destino[0].funcionario,
                        userc: userc[0].funcionario,
                        empresa: userc[0].empresa,
                        setor: user_destino[0].setor
                    });

                    await Database
                        .table('protocolos')
                        .update('atendente', user_destino[0].funcionario)
                        .update('setor',user_destino[0].setor)
                        .update('userm',userc[0].funcionario)
                        .where('id', dadosRequest.protocolo)

                    await Database
                    .table('observacoes')
                    .insert({
                        protocolo: dadosRequest.protocolo,
                        atendente: userc[0].funcionario,
                        observacao: "REPASSE : para " + user_destino[0].nome_funcionario,
                        empresa: userc[0].empresa
                    })
                }
            }
        }
        
        return retorno
    }

    async listarRepasses({request,response}){
        let retorno = ""
        const dadosRequest = request.only(["uid","empresa","protocolo"])
        const user = await Database.select("*")
                .table("funcionario_empresas")
                .where("funcionario_uid", dadosRequest.uid)
                .where("empresa", dadosRequest.empresa)
                .whereNotNull("setor");
        
        if(user.length===0){
            response?.(404)
            retorno= {erro:{codigo:104,msg:"Usuário não encontrado ou não vinculado a empresa para listar repasses"}}
        }else{
            retorno = await await Database.select(
                "repasses.*",
                "funcionarioatual.nome as funcionarioatual_nome",
                "funcionariodestino.nome as funcionariodestino_nome",
                "userc.nome as userc_nome")
                .table("repasses")
                .innerJoin("funcionarios as funcionarioatual","funcionarioatual.id","repasses.funcionarioatual")
                .innerJoin("funcionarios as funcionariodestino","funcionariodestino.id","repasses.funcionariodestino")
                .innerJoin("funcionarios as userc","userc.id","repasses.userc")
                .where("empresa", user[0].empresa)
                .where("protocolo",dadosRequest.protocolo)
                .orderBy("id");

                retorno.every((lista) => {
                    lista.funcionarioatual = {
                        id: lista.funcionarioatual,
                        nome: lista.funcionarioatual_nome,
                    }
                    lista.funcionariodestino = {
                        id: lista.funcionariodestino,
                        nome: lista.funcionariodestino_nome,
                    }
                    lista.userc = {
                        id: lista.userc,
                        nome: lista.userc_nome,
                    }
                    lista.funcionarioatual_nome = undefined
                    lista.funcionariodestino_nome = undefined
                    lista.userc_nome = undefined

                    return true;
                });
        }
        
        return retorno
    }

    async dadosRepasse({params}){
        return await Repasse.findOrFail(params.id)
    }

    async alterarRepasse({params, request}){
        const repasse = await Repasse.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaRepasse = request.only(['usuarioatual','protocolo','usuariodestino','userm'])//lembrar que repasse nao temalteracao

        repasse.merge(atualizaRepasse);

        await repasse.save();
        return repasse
    }

    async deletarRepasse({params}){
        const repasse = await Repasse.findOrFail(params.id)
        await repasse.delete();
        return{mensagem: 'Repasse deletado'}//nao se deleta repasse
    }
}

module.exports = RepasseController
