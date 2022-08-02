'use strict'

const Prioridade = use("App/Models/Prioridade")
class PrioridadeController {
    async criarPrioridade({request}){
        const dataToCreate = request.only(['ativo','nome','ordemimportancia','userc','empresa'])
        return await Prioridade.create(dataToCreate);
    }

    async listarPrioridades(){
        return await Prioridade.all();
    }

    async dadosPrioridade({params}){
        return await Prioridade.findOrFail(params.id)
    }

    async alterarPrioridade({params, request}){
        const prioridade = await Prioridade.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaPrioridade = request.only(['ativo','nome','ordemimportancia','userm'])

        prioridade.merge(atualizaPrioridade);

        await prioridade.save();
        return prioridade
    }

    async deletarPrioridade({params}){
        const prioridade = await Prioridade.findOrFail(params.id)
        await prioridade.delete();
        return{mensagem: 'Prioridade deletada'}
    }
}

module.exports = PrioridadeController
