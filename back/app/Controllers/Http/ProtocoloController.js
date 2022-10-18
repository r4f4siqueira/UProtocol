'use strict'
const Protocolo = use('App/Models/Protocolo')
const Database = use("Database");

const LogController = require("./LogController");
const logC = new LogController();

class ProtocoloController {
    async criarProtocolo({request, response}){
        let retorno =''
        const dadosRequest = request.only(['cliente','prioridade','pessoaatendida', 'motivo','previsao', 'uid', 'empresa'])
        
        //1 - Verifica se o usario que solicitou a requisição existe
        //2 - verifica se o atendente esta preenchido
        //3 - verifica se o cliente esta preenchido e se é um cliente valido
        //4 - verifica se a empresa esta prenchida
        //se todas as validacoes passar cadastra o protocolo
        //Caso contrario retorna erro com suas respectivas informacoes de erro
        
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (userc.length === 0) {
            response?.status(404)
            retorno = {erro:{codigo:10,msg:'Usuario não encontrado ou não vinculado a empresa para cadastrar protocolo'}}
        }else{
            if(dadosRequest.cliente===null || dadosRequest.cliente===undefined){
                response?.status(400)
                retorno = {erro:{codigo:12,msg:'Cliente não preenchido para cadastrar protocolo'}}
            }else{
                if(dadosRequest.empresa===null || dadosRequest.empresa===undefined){
                    response?.status(400)
                    retorno = {erro:{codigo:13,msg:'Empresa não preenchida para cadastrar protocolo'}}
                }else{
                    
                    const idCliente = await Database.select("id")
                        .table("clientes")
                        .where("id", dadosRequest.cliente)
                        .where("empresa", dadosRequest.empresa)
                    
                    if(idCliente.length===0){
                        response?.status(404)
                        retorno = {erro:{codigo:95,msg:"Cliente não encontrado"}}
                    }else{
                        retorno = await Protocolo.create({
                            atendente: userc[0].funcionario,
                            cliente: idCliente[0].id,
                            prioridade: dadosRequest.prioridade,
                            pessoaatendida: dadosRequest.pessoaatendida,
                            motivo: dadosRequest.motivo,
                            previsao: dadosRequest.previsao,
                            userc: userc[0].funcionario,
                            empresa: dadosRequest.empresa,
                            situacao: 'A'
                        })
                        //await Protocolo.create(dadosRequest);
                    }
                }
            }
        }
        return retorno
    }

    async listarProtocolos({request,response}){
        let retorno =''
        const dadosRequest = request.only(["uid","empresa"])
        const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (user.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 96,
                    msg: "Funcionario não vinculado a empresa para listar protocolos",
                },
            };
        } else {
            retorno = await Database
                .select(
                    "protocolos.*",
                    "fc.nome as userc_nome",
                    "fa.nome as atendente_nome",
                    "prioridades.ordemimportancia",
                    "prioridades.nome",
                    "clientes.fantasia"
                    )
                .table("protocolos")
                .where("protocolos.empresa", dadosRequest.empresa)
                .innerJoin("funcionarios as fc","fc.id","protocolos.userc")
                .innerJoin("clientes","clientes.id","protocolos.cliente")
                .leftJoin("funcionarios as fa","fa.id","protocolos.atendente")
                .leftJoin("prioridades","prioridades.id","protocolos.prioridade")
                .orderBy("ordemimportancia")
                .orderBy("previsao")
            //variavel para pegar a data e hora atual e comparar se o protocolo esta atrasado
            const agora = new Date()
            retorno.every((lista) => {
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome,
                }
                lista.ordemimportancia = {
                    ordem : lista.ordemimportancia,
                    nome : lista.nome
                }
                lista.atendente = {
                    id : lista.atendente,
                    nome: lista.atendente_nome
                }
                lista.cliente = {
                    id : lista.cliente,
                    nome : lista.fantasia
                }
                lista.fantasia = undefined
                lista.userc_nome = undefined
                lista.atendente_nome = undefined
                lista.nome = undefined
                lista.atrasado = agora < lista.previsao ? false : true;//verificando se o protocolo está atrasado
                
                return true;
            });
            
        }
        return retorno
    }

    async dadosProtocolo({params, response}){
        //Verifica se o parametro passado pela URL é valido
        if(params.id===null||params.id===''||parseInt(params.id)===undefined){
            response?.status(400)
            return {erro:{codigo:14,msg:'Parametros invalidos para consultar protocolo, parametro passado:'+params.id}}
        }else{
            //Pega os dados da empresa encontrada e atribui para dados
            const dados = await Protocolo.find(params.id)
            //verifica se encontrou algum protocolo
            //se nao encontrou retorna erro
            //se encontrar a empresa retorna os dados do protocolo encotrado
            if(dados === null){
                response?.status(404)
                return {erro:{codigo:15, msg:'Protocolo com ID:'+params.id+' nao encontrado'}}
            }else{
                return await Protocolo.find(params.id)
            }
        }
        //return await Protocolo.find(params.id)
    }

    async alterarProtocolo({params, request, response}){
        //usa a funcao dadosProtocolo para pegar os dados do protocolo, pois a funcao ja faz a validacao do parametro
        //caso retorne erro sera exibido o erro
        const protocolo = await this.dadosProtocolo({params})
        if(protocolo.erro!==undefined){
            return protocolo
        }else{
            if(protocolo.situacao==='C'||protocolo.situacao==='c'){
                response?.status(403)
                return {erro:{codigo:16,msg:'Protocolo já está concluido'}}
            }else{
                const atualizaProtocolo = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userm'])//lembrar de tratar a situacao para alterar apenas quando for concluir
            }
            const atualizaProtocolo = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userm'])//lembrar de tratar a situacao para alterar apenas quando for concluir
        }
        
        /*const atualizaProtocolo = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userm'])//lembrar de tratar a situacao para alterar apenas quando for concluir
        if(atualizaProtocolo.situacao==='c'|| atualizaProtocolo.situacao==='C'){
            return {erro:{codigo:16,msg:'Protocolo já está concluido'}}
        }else{
            if(atualizaProtocolo.userm===''||atualizaProtocolo.userm===null||atualizaProtocolo.userm===undefined)
        }*/
        
        
        /*protocolo.merge(atualizaProtocolo);

        await protocolo.save();
        return protocolo*/
    }

    async deletarProtocolo({params}){
        const protocolo = await Protocolo.findOrFail(params.id)
        await protocolo.delete();
        return{mensagem: 'Protocolo deletado'}
    }

    /*
    * Fazer estas duas funcoes e suas respectivas rotas!
    *
    * async repassarProtocolo({params}){}
    *
    * async concluirProtocolo({params}){]
    *
    *
    */
}

module.exports = ProtocoloController
