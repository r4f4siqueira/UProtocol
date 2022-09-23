'use strict'

const Database = use("Database");
const Cliente = use("App/Models/Cliente")

const LogController = require("./LogController");
const logC = new LogController();
class ClienteController {
    async criarCliente({request,response}){
        let retorno =  ''
        const dadosRequest = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','empresa','uid'])
        const userc = await Database.select('*')
        .table("funcionario_empresas")
        .where("funcionario_uid",dadosRequest.uid)
        .where("empresa",dadosRequest.empresa)
        if( userc[0]?.id===null || userc[0]?.id === undefined||userc[0]?.setor===null) {
            response?.status(404);
            retorno = {erro: {codigo: 60,msg: "Funcionário não vinculado a empresa para cadastrar cliente",}};
        }else{
            if(dadosRequest.razaosocial===''||dadosRequest.razaosocial===null){
                response?.status(400)
                retorno = {erro:{codigo:61,msg:"Razão social é obrigatório ser informada"}}
            }
            retorno = await Cliente.create({
                ativo:dadosRequest.ativo,
                razaosocial:dadosRequest.razaosocial,
                fantasia:dadosRequest.razaosocial,
                CNPJ_CPF:dadosRequest.CNPJ_CPF,
                userc:userc[0].funcionario,
                empresa:dadosRequest.empresa,
            });
        }
        
        //return await Cliente.create(dadpsRequest);
        return retorno
    }

    async listarClientes({request,response}){
        let retorno =''
        const dadosRequest = request.only(['uid','empresa'])
        const user = await Database.table("funcionario_empresas")
        .where("funcionario_uid", dadosRequest.uid)
        .where("empresa", dadosRequest.empresa);

        if(user[0]?.setor === null){
            response?.status(404)
            retorno = {erro:{codigo:62,msg:"Funcionario não vinculado a empresa para listar clientes"}}
        }else{
            retorno = await Database.select("clientes.*","funcionarios.nome as nomeUserc")
                .table("clientes")
                .innerJoin('funcionarios','funcionarios.id','clientes.userc')
                .where("empresa", dadosRequest.empresa)
        }
        
        return retorno
    }

    async dadosCliente({params,request,response}){
        return await Cliente.findOrFail(params.id)
    }

    async alterarCliente({params, request}){
        //let retorno = ""
        const cliente = await Cliente.find(params.id);//Retorna erro caso nao encontrar
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
