'use strict'
const Repasse = use('App/Models/Repasse')
const Database = use("Database");
class RepasseController {
    async criarRepasse({request,response}){
        let retorno = ""
        const dadosRequest = request.only(['funcionarioatual','protocolo','funcionariodestino','setor','uid','empresa'])
        
        const userc = await Database.select("funcionario_empresas.*","funcionarios.nome as nome_funcionario")
            .table("funcionario_empresas")
            .innerJoin('funcionarios','funcionarios.id','funcionario_empresas.funcionario')
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (userc.length === 0) {
            response?.status(404)
            retorno = {erro:{codigo:100,msg:'Usuario não encontrado ou não vinculado a empresa para repassar protocolo'}}
        }else{
            //Caso o funcionário de destino seja 0 o protocolo será enviado para fila de espera
            if(dadosRequest.funcionariodestino === 0){
                
                retorno = await Repasse.create({
                    funcionarioatual: dadosRequest.funcionarioatual,
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
                        funcionarioatual: userc[0].funcionario,
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
                        .where('id', dadosRequest.protocolo)

                    await Database
                    .table('observacoes')
                    .insert({
                        protocolo: dadosRequest.protocolo,
                        atendente: userc[0].funcionario,
                        observacao: userc[0].nome_funcionario + " passou o protocolo para " + user_destino[0].nome_funcionario,
                        empresa: userc[0].empresa
                    })
                }
            }
        }
        
        return retorno
    }

    async listarRepasses(){
        return await Repasse.all();
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
