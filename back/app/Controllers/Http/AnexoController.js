'use strict'
const Database = use("Database");

const LogController = require("./LogController");
const logC = new LogController();
const Anexo = use("App/Models/Anexo");
class AnexoController {
    async criarAnexo({request,response}){
        let retorno = ""
        const dadosRequest = request.only(['protocolo','descricao','anexo','uid','empresa'])

        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");
        
            if (userc.length === 0) {
                response?.status(404)
                retorno = { erro: { codigo: 108, msg: 'Funcionário não vinculado a empresa para criar um anexo' } }
            } else {
                const protocolo = await Database.select("id")
                        .table("protocolos")
                        .where("id", dadosRequest.protocolo)
                        .where("empresa", dadosRequest.empresa)
                    
                if (protocolo.length === 0) {
                    response?.status(404)
                    retorno = { erro: { codigo: 109, msg: 'Protocolo não encontrado para vincular um Anexo' } }
                } else {
                    retorno = await Anexo.create({
                        protocolo: protocolo[0].id,
                        descricao: dadosRequest.descricao,
                        anexo: dadosRequest.anexo,
                        userc: userc[0].funcionario,
                        empresa: userc[0].empresa
                    })
                }
            }
        //return await Anexo.create(dataToCreate);
        return retorno;
    }

    async listarAnexos({request,response}){
        let retorno = ""
        const dadosRequest = request.only(["protocolo","uid","empresa"])
        
        const user = await Database.select("*")
                .table("funcionario_empresas")
                .where("funcionario_uid", dadosRequest.uid)
                .where("empresa", dadosRequest.empresa)
                .whereNotNull("setor");
        
        if(user.length===0){
            response?.status(404)
            retorno= {erro:{codigo:110,msg:"Usuário não encontrado ou não vinculado a empresa para listar anexos"}}
        }else{

            retorno = await Database.select("anexos.*","funcionarios.nome as userc_nome",)
                .table("anexos")
                .innerJoin("funcionarios","funcionarios.id","anexos.userc")
                .where("empresa", user[0].empresa)
                .where("protocolo",dadosRequest.protocolo)
                .orderBy("id");

            retorno.every((lista)=>{
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome,
                }
                lista.userc_nome = undefined
                
                return true
            })
        }
        
        //return await Anexo.all();
        return retorno
    }

    async dadosAnexo({params}){
        return await Anexo.findOrFail(params.id)
    }

    async alterarAnexo({params, request}){
        let retorno = ""
        const anexo = await Anexo.find(params.id);//Retorna erro caso nao encontrar
        if (anexo === null || anexo === undefined || anexo === "") {
            response?.status(404);
            retorno = { erro: { codigo: 111, msg: "Anexo não encontrado para ser alterado" } };
        } else {
            const dadosRequest = request.only(['descricao','anexo','uid','empresa'])
            
            const userm = await Database.select("*")
                .table("funcionario_empresas")
                .where("funcionario_uid", dadosRequest.uid)
                .where("empresa", dadosRequest.empresa)
                .whereNotNull("setor");
        
            if(userm.length===0){
                response?.status(404)
                retorno= {erro:{codigo:112,msg:"Usuário não encontrado ou não vinculado a empresa para alterar anexo"}}
            }else{
                const novosDados = {
                    descricao: dadosRequest.ativo,
                    anexo: dadosRequest.nome,
                    userm: userm[0].funcionario,
                };
                await logC.novoLog({
                    request: {
                        operacao: "ALTERAR",
                        tabela: "anexos",
                        coluna: "",
                        valorantigo: JSON.stringify(anexo),
                        valornovo: JSON.stringify(novosDados),
                        funcionario: userm[0].funcionario,
                        empresa: userm[0].empresa,
                    },
                });
                anexo.merge(novosDados);
                await anexo.save();
                retorno = anexo;
            }
        }
        return retorno
    }

    async deletarAnexo({params,request,response}){
        let retorno = ""
        const anexo = await Anexo.find(params.id);//Retorna erro caso nao encontrar
        if (anexo === null || anexo === undefined || anexo === "") {
            response?.status(404);
            retorno = { erro: { codigo: 113, msg: "Anexo não encontrado para ser deletado" } };
        } else {
            const dadosRequest = request.only(['uid'])
            
            const userm = await Database.select("*")
                .table("funcionario_empresas")
                .where("funcionario_uid", dadosRequest.uid)
                .where("empresa", anexo.empresa)
                .whereNotNull("setor");
        
            if(userm.length===0){
                response?.status(404)
                retorno= {erro:{codigo:114,msg:"Usuário não encontrado ou não vinculado a empresa para deletar anexo"}}
            }else{
                await logC.novoLog({
                    request: {
                        operacao: "EXCLUIR",
                        tabela: "anexos",
                        coluna: "",
                        valorantigo: JSON.stringify(anexo),
                        valornovo: null,
                        funcionario: userm[0].funcionario,
                        empresa: userm[0].empresa,
                    },
                });

                retorno = anexo
                await anexo.delete();
            }
        }
        return retorno
    }
}

module.exports = AnexoController
