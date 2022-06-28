'use strict'

class LogController {
    async criarLog({request}){
        const dataToCreate = request.only(['operacao','tabela','coluna','valorantigo','valornovo', 'empresa'])
        return await Log.create(dataToCreate);
    }

    async listarLogs(){
        return await Log.all();
    }

    async dadosLog({params}){
        return await Log.findOrFail(params.id)
    }

    async alterarLog({params, request}){
        const log = await Log.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaLog = request.only(['operacao','tabela','coluna','valorantigo','valornovo'])//Nao se altera log mas dx a funcao aki para estudos

        log.merge(atualizaLog);

        await log.save();
        return log
    }

    async deletarLog({params}){
        const log = await Log.findOrFail(params.id)
        await log.delete();
        return{mensagem: 'Log deletado'}//Nao se deleta log mas dx para estudos
    }
}

module.exports = LogController
