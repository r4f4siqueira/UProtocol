'use strict'
const Repasse = use('App/Models/Repasse')
const Database = use("Database");
class RepasseController {
    async criarRepasse({request,response}){
        let retorno = ""
        const dadosRequest = request.only(['funcionarioatual','protocolo','funcionariodestino','uid','empresa'])
        
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

            if (userc.length === 0) {
                response?.status(404)
                retorno = {erro:{codigo:100,msg:'Usuario não encontrado ou não vinculado a empresa para repassar protocolo'}}
            }else{
                const user_destino = await Database.select("*")
                    .table("funcionario_empresas")
                    .where("funcionario", dadosRequest.usuariodestino)
                    .where("empresa", dadosRequest.empresa)
                    .whereNotNull("setor");
                
                if (user_destino.length === 0) {
                    response?.status(404)
                    retorno = {erro:{codigo:101,msg:'Funcionário de destino não encontrado ou não vinculado a empresa para repassar protocolo'}}
                }else{

                    //continuar a partir daqui!
                    //validar se está preenchido os campos de setor e funcionario de destino

                    retorno = await Repasse.create({
                        funcionarioatual: dadosRequest.funcionarioatual,
                        protocolo: dadosRequest.protocolo,
                        funcionariodestino: user_destino[0].funcionario,
                        userc: userc[0].funcionario,
                        empresa: userc[0].empresa
                    });

                    await Database
                        .table('protocolos')
                        .where('id', dadosRequest.protocolo)
                        .update('atendente', user_destino[0].funcionario)
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
