'use strict'

const Database = use("Database");

const LogController = require("./LogController");
const logC = new LogController();

const Prioridade = use("App/Models/Prioridade")
class PrioridadeController {
    async criarPrioridade({request,response}){
        let retorno = ''
        const dadosRequest = request.only(["ativo","nome","ordemimportancia","uid","empresa"])
        const userc = await Database.select("*")
        .table("funcionario_empresas")
        .where("funcionario_uid", dadosRequest.uid)
        .where("empresa", dadosRequest.empresa)
        .whereNotNull("setor")

        if(userc.length === 0){
            response?.status(404)
            retorno = {erro:{codigo:85,msg:"Funcionario não vinculado a empresa para criar Prioridade"}}
        }else{
            if(userc[0]?.cargo === "F"){
                response?.status(403)
                retorno = {erro:{codigo:86,msg:"Funcionário sem permissão para Criar prioridade"}}
            }else{
                if(
                    dadosRequest.nome === undefined||
                    dadosRequest.nome === null ||
                    dadosRequest.nome === '' ||
                    dadosRequest.ordemimportancia === undefined||
                    dadosRequest.ordemimportancia === null ||
                    dadosRequest.ordemimportancia === ''
                ){
                    response?.status(400)
                    retorno = {erro:{codigo:87,msg:"Nome ou Ordem de Importância inválidos"}}
                }else{
                    retorno = await Prioridade.create({
                        ativo: dadosRequest.ativo,
                        nome: dadosRequest.nome,
                        ordemimportancia: dadosRequest.ordemimportancia,
                        userc: userc[0].funcionario,
                        empresa:dadosRequest.empresa
                    })
                }
                
                
            }
        }
        return retorno
        //return await Prioridade.create(dataToCreate);
    }

    async listarPrioridades({request,response}){
        let retorno = ''
        const dadosRequest = request.only(["uid","empresa"])
        const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor")

        if(user.length===0){
            response?.status(404)
            retorno = {erro:{codigo:88,msg:"funcionario não vinculado a empresa para listar prioridades"}}
        }else{
            retorno = await Database.select("prioridades.*","funcionarios.nome as userc_nome")
                .table("prioridades")
                .innerJoin('funcionarios','funcionarios.id','prioridades.userc')
                .where("empresa", dadosRequest.empresa)
                .orderBy('ordemimportancia', 'asc')

            retorno.every((lista)=>{
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome
                }
                lista.userc_nome=undefined
                return true
            })
        }
        return retorno
        //return await Prioridade.all();
    }

    async dadosPrioridade({params}){
        return await Prioridade.findOrFail(params.id)
    }

    async alterarPrioridade({params,request,response}){
        let retorno = ''
        const prioridade = await Prioridade.find(params.id);

        if(!prioridade){
            response?.status(404)
            retorno = {erro:{codigo:89,msg:"Prioridade não encontrada para ser alterada"}}
        }else{
            const dadosRequest = request.only(["ativo","nome","ordemimportancia","uid","empresa"])
            const userm = await Database.select('*')
                .table('funcionario_empresas')
                .where('funcionario_uid',dadosRequest.uid)
                .where('empresa',dadosRequest.empresa)
                .whereNotNull("setor")

            if(userm.length === 0){
                response?.status(404)
                retorno = {erro:{codigo:90,msg:"Funcionario não vinculado a empresa para alterar Prioridade"}}
            }else{
                if(userm[0]?.cargo ==="F"){
                    response?.status(403)
                    retorno = {erro:{codigo:91,msg:"Funcionário sem permissão para alterar prioridade"}}
                }else{
                    await logC.novoLog({
                        request: {
                            operacao:"ALTERAR",
                            tabela: "prioridades",
                            coluna: "",
                            valorantigo: JSON.stringify(prioridade),
                            valornovo: JSON.stringify({
                                ativo: dadosRequest.ativo,
                                nome: dadosRequest.nome,
                                ordemimportancia: dadosRequest.ordemimportancia,
                                userm: userm[0].funcionario,
                                empresa: dadosRequest.empresa
                            }),
                            funcionario: userm[0].funcionario,
                            empresa: dadosRequest.empresa
                        }
                    })
                    
                    prioridade.merge({
                        ativo: dadosRequest.ativo,
                        nome: dadosRequest.nome,
                        ordemimportancia: dadosRequest.ordemimportancia,
                        userm: userm[0].funcionario,
                    });

                    await prioridade.save();
                    retorno = prioridade
                }
            }
        }
        return retorno
    }

    async deletarPrioridade({params,request,response}){
        let retorno = ''
        const prioridade = await Prioridade.find(params.id)
        if (!prioridade){
            response?.status(404)
            retorno = {erro:{codigo:92,msg:"Prioridade não encontrada para ser deletada"}}
        }else{
            const dadosRequest = request.only(["uid","empresa"])
            const user = await Database.select('*')
                .table('funcionario_empresas')
                .where('funcionario_uid',dadosRequest.uid)
                .where('empresa',prioridade.empresa)
                .whereNotNull("setor")

            if(user.length === 0){
                response?.status(404)
                retorno = {erro:{codigo:93,msg:"Funcionario não vinculado a empresa para deletar Prioridade"}}
            }else{
                if(user[0]?.cargo ==="F"){
                    response?.status(403)
                    retorno = {erro:{codigo:94,msg:"Funcionário sem permissão para deletar prioridade"}}
                }else{
                    retorno=prioridade;
                    
                    await logC.novoLog({
                        request: {
                            operacao:"DELETAR",
                            tabela: "prioridades",
                            coluna: "",
                            valorantigo: JSON.stringify(prioridade),
                            valornovo: null,
                            funcionario: user[0].funcionario,
                            empresa: user[0].empresa
                        }
                    })
                    
                   // await prioridade.delete();
                }

            }
        }
        return retorno
    }
}

module.exports = PrioridadeController
