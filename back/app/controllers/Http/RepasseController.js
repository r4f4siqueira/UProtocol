'use strict'

class RepasseController {
    async criarRepasse({request}){
        const dataToCreate = request.only(['usuarioatual','protocolo','usuariodestino','userc','empresa'])
        return await Repasse.create(dataToCreate);
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
