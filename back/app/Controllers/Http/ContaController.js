'use strict'

class ContaController {
    async criarConta({request}){
        const dataToCreate = request.only(['ativo','clogin','senha'])
        return await Conta.create(dataToCreate);
    }

    async listarConta(){
        return await Conta.all();
    }

    async dadosConta({params}){
        return await Conta.findOrFail(params.id)
    }

    async alterarConta({params, request}){
        const conta = await Conta.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaConta = request.only(['ativo','senha'])

        conta.merge(atualizaConta);

        await conta.save();
        return conta
    }

    async deletarConta({params}){
        const conta = await Conta.findOrFail(params.id)
        await conta.delete();
        return{mensagem: 'Conta deletada'}
    }
}

module.exports = ContaController
