"use strict";

const Database = use("Database");
const Contato = use("App/Models/Contato");
const Cliente = use("App/Models/Cliente")

const LogController = require("./LogController");
const logC = new LogController();
class ContatoController {
    async criarContato({ request, response }) {
        let retorno = ''
        const dadosRequest = request.only([
            "ativo",
            "cliente",
            "telefone",
            "email",
            "pessoa",
            "uid",
            "empresa",
        ]);
        
        const cliente = await Cliente.find(dadosRequest.cliente)
        if(!cliente){
            response?.status(404)
            retorno = {erro:{codigo:76,msg:"Cliente não encontrado para criar contatos"}}
        }else{
            const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);

            if(userc[0]?.empresa !== cliente.empresa){
                response?.status(404)
                retorno = {erro:{codigo:75,msg:"Funcionario não vinculado a empresa para criar contato"}}
            }else{
                retorno = await Contato.create({
                    ativo: dadosRequest.ativo,
                    cliente: dadosRequest.cliente,
                    telefone: dadosRequest.telefone,
                    email: dadosRequest.email,
                    pessoa: dadosRequest.pessoa,
                    userc: userc[0].funcionario,
                    empresa: dadosRequest.empresa
                })
            }
        }
        return retorno
    }

    async listarContatos({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only(["uid", "empresa", "cliente"]);
        const cliente = await Cliente.find(dadosRequest.cliente)
        if(!cliente){
            response?.status(404)
            retorno = {erro:{codigo:77,msg:"Cliente não encontrado para listar contatos"}}
        }else{
            const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);

            if (user[0]?.setor === null || user[0]?.empresa !== cliente.empresa) {
                response?.status(404);
                retorno = {
                    erro: {
                        codigo: 63,
                        msg: "Funcionario não vinculado a empresa para listar contato",
                    },
                };
            } else {
                retorno = await Database.select("contatos.*","funcionarios.nome as userc_nome")
                    .table("contatos")
                    .innerJoin('funcionarios','funcionarios.id','contatos.userc')
                    .where("cliente", cliente.id)
                    .where("empresa", dadosRequest.empresa)

                retorno.every((lista)=>{
                    lista.cliente = {
                        id: cliente.id,
                        nome: cliente.razaosocial
                    }
                    lista.userc = {
                        id: lista.userc,
                        nome: lista.userc_nome
                    }
                    lista.userc_nome=undefined
                    return true
                })
            }
        }
        return retorno;
        //return await Contato.all();
    }

    async dadosContato({ params }) {
        return await Contato.findOrFail(params.id);
    }

    async alterarContato({ params, request, response }) {
        let retorno = ''
        const contato = await Contato.find(params.id); //Retorna erro caso nao encontrar
        
        if(!contato){
            response?.status(404)
            retorno = {erro:{codigo:78,msg:"Contato com a id informada não encontrado"}}
        }else{
            const dadosRequest = request.only([
                "ativo",
                "cliente",
                "telefone",
                "email",
                "pessoa",
                "uid",
            ]);

            const userm = await Database.select('*')
                .table('funcionario_empresas')
                .where('funcionario_uid',dadosRequest.uid)
                .where('empresa',contato.empresa)
                .whereNotNull("setor")

                if(userm.length === 0){
                response?.status(404)
                retorno = {erro:{codigo:79,msg:"Funcionario não vinculado a empresa para alterar contato"}}
            }else{
                if(dadosRequest.cliente !== contato.cliente){
                    response?.status(400)
                    retorno = {erro:{codigo:81,msg:"Contato não pertence ao cliente selecionado/informado"}}
                }else{
                    await logC.novoLog({
                        request: {
                            operacao: "ALTERAR",
                            tabela: "CONTATO",
                            coluna: "",
                            valorantigo: JSON.stringify(contato),
                            valornovo: JSON.stringify({
                                ativo: dadosRequest.ativo,
                                telefone: dadosRequest.telefone,
                                email: dadosRequest.email,
                                pessoa: dadosRequest.pessoa
                            }),
                            funcionario: userm[0]?.funcionario,
                            empresa: dadosRequest.empresa,
                        }
                    })
    
                    contato.merge({
                        ativo: dadosRequest.ativo,
                        telefone: dadosRequest.telefone,
                        email: dadosRequest.email,
                        pessoa: dadosRequest.pessoa,
                        userm: userm[0]?.funcionario
                    })
    
                    let salvar = await contato.save()
                    if(salvar){
                        retorno = contato
                    }else{
                        response?.status(500)
                        retorno = {erro:{codigo:80,msg:"Algo deu errado em salvar contato"}}
                    }
                }                
            }
        }

        return retorno
        // contato.merge(atualizaContato);

        // await contato.save();
        // return contato;
    }

    async deletarContato({params,request,response}) {
        let retorno = ''
        const contato = await Contato.find(params.id);
        if(!contato){
            response?.status(404)
            retorno = {erro:{codigo:82,msg:"Contato não encontrado para ser excluido"}}
        }else{
            const dadosRequest = request.only(["uid","empresa"])
            if(!dadosRequest.uid){
                response?.status(400)
                retorno= {erro:{codigo:83,msg:"uid não informada para excluir contato"}}
            }else{
                const userm = await Database.select('*')
                .table('funcionario_empresas')
                .where('funcionario_uid',dadosRequest.uid)
                .where('empresa',dadosRequest.empresa)

                if(userm[0]?.empresa !== contato.empresa){
                    response?.status(404)
                    retorno = {erro:{codigo:84,msg:"Usuario não cadastrado ou não vinculado a empresa para excluir contato"}}
                }else{
                    await logC.novoLog({
                        request: {
                            operacao: "EXCLUIR",
                            tabela: "contatos",
                            coluna: "",
                            valorantigo: JSON.stringify(contato),
                            valornovo: null,
                            funcionario: userm[0].funcionario,
                            empresa: userm[0].empresa,
                        },
                    });

                    retorno = contato
                    await contato.delete()
                }
            }
        }
        return retorno
    }
}

module.exports = ContatoController;
