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

        if(user?.length === 0){
            response?.status(404)
            retorno = {erro:{codigo:62,msg:"Funcionario não vinculado a empresa para listar clientes"}}
        }else{
            retorno = await Database.select("clientes.*",
                "funcionarios.nome as userc_nome",
                'empresas.fantasia as empresa_nome'
            )
                .table("clientes")
                .innerJoin('funcionarios','funcionarios.id','clientes.userc')
                .innerJoin('empresas','empresas.id','clientes.empresa')
                .where("empresa", dadosRequest.empresa)

                retorno.every((lista)=>{
                    lista.empresa = {
                        id: lista.empresa,
                        nome:lista.empresa_nome
                    }
                    lista.userc = {
                        id: lista.userc,
                        nome: lista.userc_nome
                    }
                    lista.empresa_nome=undefined
                    lista.userc_nome=undefined
                    return true
                })
        }
        
        return retorno
    }

    async dadosCliente({params,request,response}){
        return await Cliente.findOrFail(params.id)
    }

    async alterarCliente({params, request, response}){
        let retorno = ''
        const cliente = await Cliente.find(params.id)
        if(cliente === null){
            response?.status(404)
            retorno = {erro:{codigo:66,msg:"Cliente não encontrado para ser alterado"}}
        }else{
            const dadosRequest = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','uid','empresa'])
            if(dadosRequest.uid===null||dadosRequest.uid===''||dadosRequest.uid===undefined){
                response?.status(400)
                retorno = {
                    erro:{
                        codigo:67,
                        msg:"uid não Informada"
                    }
                }
            } else {
                if(dadosRequest.fantasia=== null || dadosRequest.fantasia===undefined || dadosRequest.fantasia===''){
                    response?.status(400)
                    retorno = {erro:{
                        codigo:69,
                        msg:"Razão Social ou Nome não informados",
                    }}
                }
                const funcionarioEmpresa = Database.select('*')
                    .table('funcionario_empresas')
                    .where('funcionario_uid',dadosRequest.uid)
                    .where('empresa',dadosRequest.empresa)
                    if(funcionarioEmpresa.length === 0){
                        response?.status(404)
                        retorno = {
                            erro:{
                                codigo:68,
                                msg:"Funcionário não vinculado a empresa para alterar dados"
                            }
                        }
                    } else {
                        cliente.merge({
                            ativo: dadosRequest.ativo,
                            razaosocial: dadosRequest.razaosocial,
                            fantasia: dadosRequest.fantasia,
                            CNPJ_CPF: dadosRequest.CNPJ_CPF
                        })
                    }
            }
        }
        // const atualizaCliente = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','userm'])

        // cliente.merge(atualizaCliente);

        // await cliente.save();
        return retorno
    }

    async deletarCliente({params}){
        const cliente = await Cliente.findOrFail(params.id)
        await cliente.delete();
        return{mensagem: 'Cliente deletado'}
    }
}

module.exports = ClienteController
