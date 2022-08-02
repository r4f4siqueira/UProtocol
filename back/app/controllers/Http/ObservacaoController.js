'use strict'

const Observacao = use("App/Models/Observacao")
class ObservacaoController {
    async criarObservacao({request}){
        const dataToCreate = request.only(['protocolo','atendente','observacao','empresa'])
        return await Observacao.create(dataToCreate);
    }

    async listarObservacoes(){
        return await Observacao.all();
    }

    async dadosObservacao({params}){
        return await Observacao.findOrFail(params.id)
    }

    async alterarObservacao({params, request}){
        const observacao = await Observacao.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaObservacao = request.only([])//observacao nao altera, mas dx aqui vai que

        observacao.merge(atualizaObservacao);

        await observacao.save();
        return observacao
    }

    async deletarObservacao({params}){
        const observacao = await Observacao.findOrFail(params.id)
        await observacao.delete();
        return{mensagem: 'Observacao deletada'}//observacao nao deleta mas dx aki para testes de rota DEPOIS TIRA PELO AMOR DE DEUS
    }
}

module.exports = ObservacaoController
