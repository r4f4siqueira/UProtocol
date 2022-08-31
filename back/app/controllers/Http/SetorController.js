'use strict'

const Database = use('Database')

const Setor = use('App/Models/Setor')
const FuncionarioEmpresaController = require('./FuncionarioEmpresaController')
const funcionarioEmpresaC = new FuncionarioEmpresaController()

class SetorController {
    async criarSetor({request}){
        const dataToCreate = request.only(['ativo','nome','userc','empresa',])
        return await Setor.create(dataToCreate);
    }

    async listarSetores({request,response}){
        //exemplo de url
        //http://127.0.0.1:3333/setor?uid=nN4TfCisXFdapqgYzWdg29ohWHe
        const user = request.only(["uid"])
        if (user.uid===''||user.uid===undefined||user.uid===null){
            response?.status(400)
            return {erro:{codigo:30,msg: 'Parametros invalidos para buscar setores vinculadas a empresa'}}
        }else{
            //vai no banco e busca a primeira empresa vinculada ao funcionario
            const idEmpresa = await Database.select('empresa').table('funcionario_empresas').where('funcionario_uid',user.uid).first()
            const setores = await Database.select('*').table('setors').where('empresa',idEmpresa.empresa)
            return setores
        }
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
