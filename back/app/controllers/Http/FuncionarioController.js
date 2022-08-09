'use strict'

const Funcionario = use("App/Models/Funcionario");

class FuncionarioController {
    async criarFuncionario({request}){
        const dataToCreate = request.only(['ativo','nome','email','uid','avatarURL'])
        if (dataToCreate.uid === '' || dataToCreate.uid===null || dataToCreate.uid===undefined){
            
        }
        
        return await Funcionario.create(dataToCreate);
    }

    async listarFuncionario(){
        return await Funcionario.all();
    }

    async dadosFuncionario({params}){
        return await Funcionario.findOrFail(params.id)
    }

    async alterarFuncionario({params, request}){
        const funcionario = await Funcionario.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaFuncionario = request.only(['ativo','nome','email','avatarURL'])

        funcionario.merge(atualizaFuncionario);

        await funcionario.save();
        return funcionario
    }

    async deletarFuncionario({params}){
        const funcionario = await Funcionario.findOrFail(params.id)
        await funcionario.delete();
        return{mensagem: 'Funcionario deletado'}
    }
}

module.exports = FuncionarioController
