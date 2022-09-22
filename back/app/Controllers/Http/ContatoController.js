'use strict'

class ContatoController {
    async criarContato({request}){
        const dataToCreate = request.only(['ativo','cliente','telefone','email','pessoa', 'userc','empresa'])
        return await Contato.create(dataToCreate);
    }

    async listarContatos(){
        return await Contato.all();
    }

    async dadosContato({params}){
        return await Contato.findOrFail(params.id)
    }

    async alterarContato({params, request}){
        const contato = await Contato.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaContato = request.only(['ativo','cliente','telefone','email','pessoa', 'userm'])

        contato.merge(atualizaContato);

        await contato.save();
        return contato
    }

    async deletarContato({params}){
        const contato = await Contato.findOrFail(params.id)
        await contato.delete();
        return{mensagem: 'Contato deletado'}
    }
}

module.exports = ContatoController
