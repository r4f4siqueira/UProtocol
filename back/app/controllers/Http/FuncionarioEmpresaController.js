'use strict'

const Database = use('Database')
const FuncionarioEmpresa = use("App/Models/FuncionarioEmpresa")

class FuncionarioEmpresaController {
    async criarFuncionarioEmpresa({request}){
        const dataToCreate = request.only(['empresa','funcionario'])
        return await FuncionarioEmpresa.create(dataToCreate);
    }

    //Funcao para ser usada por dentro dos controllers
    async vinculaFuncionarioEmpresa({request}){
        //passar a request como um objeto ex:
        //{request:{empresa:1,funcionario:1,setor:1,cargo:'A'}}
        await FuncionarioEmpresa.create(request);
    }

    async listarFuncionarioEmpresas(){
        return await FuncionarioEmpresa.all();
    }

    async dadosFuncionarioEmpresa({params}){
        return await FuncionarioEmpresa.findOrFail(params.id)
    }

    async verificaVinculo(uid,empresa){
        const result = await Database.table('funcionario_empresas').where('funcionario_uid',uid).where('empresa',empresa)
        return result.length !== 0
    }

    async alterarFuncionarioEmpresa({params, request}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaFuncionarioEmpresa = request.only(['empresa','funcionario'])

        funcionarioEmpresa.merge(atualizaFuncionarioEmpresa);

        await funcionarioEmpresa.save();
        return funcionarioEmpresa
    }

    async deletarFuncionarioEmpresa({params}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id)
        await funcionarioEmpresa.delete();
        return{mensagem: 'Funcionario relacionado a Empresa deletado'}
    }
}

module.exports = FuncionarioEmpresaController
