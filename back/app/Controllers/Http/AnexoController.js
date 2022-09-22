'use strict'

class AnexoController {
    async criarAnexo({request}){
        const dataToCreate = request.only(['protocolo','descricao','anexo','userc','empresa'])
        return await Anexo.create(dataToCreate);
    }

    async listarAnexos(){
        return await Anexo.all();
    }

    async dadosAnexo({params}){
        return await Anexo.findOrFail(params.id)
    }

    async alterarAnexo({params, request}){
        const anexo = await Anexo.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaAnexo = request.only(['descricao','anexo','userm'])

        anexo.merge(atualizaAnexo);

        await anexo.save();
        return anexo
    }

    async deletarAnexo({params}){
        const anexo = await Anexo.findOrFail(params.id)
        await anexo.delete();
        return{mensagem: 'Anexo deletadao'}
    }
}

module.exports = AnexoController
