'use strict'

const Cliente = use("App/Models/Cliente")
class ClienteController {
    async criarCliente({request}){
        const dataToCreate = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','userc','empresa'])
        return await Cliente.create(dataToCreate);
    }

    async listarClientes(){
        return await Cliente.all();
    }

    async dadosCliente({params}){
        return await Cliente.findOrFail(params.id)
    }

    async alterarCliente({params, request}){
        const cliente = await Cliente.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaCliente = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','userm'])

        cliente.merge(atualizaCliente);

        await cliente.save();
        return cliente
    }

    async deletarCliente({params}){
        const cliente = await Cliente.findOrFail(params.id)
        await cliente.delete();
        return{mensagem: 'Cliente deletado'}
    }
}

module.exports = ClienteController
