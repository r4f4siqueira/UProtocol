'use strict'
const Log = use('App/Models/Log')

class LogController {    
    //Funcao usada quando se usa uma requisicao via HTTP
    /*async criarLog({request}){
        const dataToCreate = request.only(['operacao','tabela','coluna','valorantigo','valornovo','user', 'empresa'])
        return await Log.create(dataToCreate);
    }*/
    //Funcao criada para usar nos controlers, pois a REQUEST é diferente quando se usa HTTP;
    //Quando se passa direto por parametro vai apenas um objeto com as informacoes nescessarias, no HTTP vai um arrey de objetos
    //Por HTTP é pasaddo um vetor de objeto com varias informacoes referente ao cabecalho HTTP
    //Quando invoco a funcao pelo javascript eu passo apenas as informacoes nesessarias para inserir no banco de dados
    async novoLog({request}){
        await Log.create(request);
    }

    async listarLogs(){
        return await Log.all();
    }

    async dadosLog({params}){
        return await Log.findOrFail(params.id)
    }

    /*async alterarLog({params, request}){
        const log = await Log.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaLog = request.only(['operacao','tabela','coluna','valorantigo','valornovo'])//Nao se altera log mas dx a funcao aki para estudos

        log.merge(atualizaLog);

        await log.save();
        return log
    }*/

    /*async deletarLog({params}){
        const log = await Log.findOrFail(params.id)
        await log.delete();
        return{mensagem: 'Log deletado'}//Nao se deleta log mas dx para estudos
    }*/
}

module.exports = LogController
