'use strict'

class FuncionarioEmpresaController {
    async criarFuncionarioEmpresa({request}){
        const dataToCreate = request.only(['empresa','funcionario'])
        return await FuncionarioEmpresa.create(dataToCreate);
    }

    async listarFuncionarioEmpresas(){
        return await FuncionarioEmpresa.all();
    }

    async dadosFuncionarioEmpresa({params}){
        return await FuncionarioEmpresa.findOrFail(params.id)
    }

    async alterarFuncionarioEmpresa({params, request}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaFuncionarioEmpresa = request.only(['empresa','funcionario'])

        funcionarioEmpresa.merge(atualizaFuncionarioEmpresa);

        await funcionarioEmpresa.save();
        return funcionarioEmpresa
    }

    async deletarUsuarioEmpresa({params}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id)
        await funcionarioEmpresa.delete();
        return{mensagem: 'Funcionario relacionado a Empresa deletado'}
    }
}

module.exports = FuncionarioEmpresaController
