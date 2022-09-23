'use strict'

const Database = use("Database");
const Contato = use("App/Models/Contato")
class ContatoController {
    async criarContato({request}){
        const dataToCreate = request.only(['ativo','cliente','telefone','email','pessoa', 'uid','empresa'])
        const userc = await Database.select('*')
        .table("funcionario_empresas")
        .where("funcionario_uid",dataToCreate.uid)
        .where("empresa",dataToCreate.empresa)
        
        await Database
            .insert({
                    ativo:dataToCreate.ativo,
                    cliente:dataToCreate.cliente,
                    telefone:dataToCreate.telefone,
                    email:dataToCreate.email,
                    pessoa:dataToCreate.pessoa,
                    userc:userc[0].id,
                    empresa:dataToCreate.empresa
                })
            .into('contatos')
            return await Database.select('*')
            .table("contatos")
            .where("empresa",dataToCreate.empresa)
            .last()
            
        
        // return await Contato.create({
        //     ativo:dataToCreate.ativo,
        //     cliente:dataToCreate.cliente,
        //     telefone:dataToCreate.telefone,
        //     email:dataToCreate.email,
        //     pessoa:dataToCreate.pessoa,
        //     userc:userc[0].id,
        //     empresa:dataToCreate.empresa
        // });
    }

    async listarContatos({request,response}){
        let retorno =''
        const dadosRequest = request.only(['uid','empresa','id'])
        const user = await Database.table("funcionario_empresas")
        .where("funcionario_uid", dadosRequest.uid)
        .where("empresa", dadosRequest.empresa);

        if(user[0]?.setor === null){
            response?.status(404)
            retorno = {erro:{codigo:63,msg:"Funcionario não vinculado a empresa para listar contato"}}
        }else{
            retorno = await Database.select("contatos.*","funcionarios.nome as nomeUserc")
                .table("contatos")
                .innerJoin('funcionarios','funcionarios.id','contatos.userc')
                .where("empresa", dadosRequest.empresa)
        }
        
        return retorno
        //return await Contato.all();
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
