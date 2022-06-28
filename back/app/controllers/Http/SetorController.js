'use strict'

class SetorController {
    async criarSetor({request}){
        const dataToCreate = request.only(['ativo','nome','userc','empresa',])
        return await Setor.create(dataToCreate);
    }

    async listarSetores(){
        return await Setor.all();
    }

    async dadosSetor({params}){
        return await Setor.findOrFail(params.id)
    }

    async alterarSetor({params, request}){
        const setor = await Setor.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaSetor = request.only(['ativo','nome','userm'])

        setor.merge(atualizaSetor);

        await setor.save();
        return setor
    }

    async deletarSetor({params}){
        const setor = await Setor.findOrFail(params.id)
        await setor.delete();
        return{mensagem: 'Setor deletado'}
    }
}

module.exports = SetorController
