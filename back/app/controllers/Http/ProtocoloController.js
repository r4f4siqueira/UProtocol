'use strict'
const Protocolo = use('App/Models/Protocolo')

class ProtocoloController {
    async criarProtocolo({request}){
        const dataToCreate = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userc', 'empresa'])
        return await Protocolo.create(dataToCreate);
    }

    async listarProtocolos(){
        return await Protocolo.all();
    }

    async dadosProtocolo({params}){
        return await Protocolo.findOrFail(params.id)
    }

    async alterarProtocolo({params, request}){
        const protocolo = await Protocolo.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaProtocolo = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userm'])//lembrar de tratar a situacao para alterar apenas quando for concluir

        protocolo.merge(atualizaProtocolo);

        await protocolo.save();
        return protocolo
    }

    async deletarProtocolo({params}){
        const protocolo = await Protocolo.findOrFail(params.id)
        await protocolo.delete();
        return{mensagem: 'Protocolo deletado'}
    }
}

module.exports = ProtocoloController
