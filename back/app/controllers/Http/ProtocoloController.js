'use strict'
const Protocolo = use('App/Models/Protocolo')

class ProtocoloController {
    async criarProtocolo({request, response}){
        const dataToCreate = request.only(['atendente','cliente','situacao','prioridade','pessoaatendida', 'motivo', 'userc', 'empresa'])
        
        //1 - Verifica se o usario de cracao esta preenchido
        //2 - verifica se o atendente esta preenchido
        //3 - verifica se o cliente esta preenchido e se é um cliente valido
        //4 - verifica se a empresa esta prenchida
        //se todas as validacoes passar cadastra o protocolo
        //Caso contrario retorna erro com suas respectivas informacoes de erro
        if(dataToCreate.userc===null || dataToCreate.userc===undefined){
            return response.status(400).json({erro:{codigo:10,msg:'Userc não preenchido para cadastrar protocolo'}})
        }else{
            if(dataToCreate.atendente===null || dataToCreate.atendente===undefined){
                return response.status(400).json({erro:{codigo:11, msg:'Atendente não preenchido para cadastrar protocolo'}})
            } else{
                if(dataToCreate.cliente===null || dataToCreate.cliente===undefined){
                    return response.status(400).json({erro:{codigo:12,msg:'Cliente não preenchido para cadastrar protocolo'}})
                }else{
                    if(dataToCreate.empresa===null || dataToCreate.empresa===undefined){
                        return response.status(400).json({erro:{codigo:13,msg:'Empresa não preenchida para cadastrar protocolo'}})
                    }else{
                        return await Protocolo.create(dataToCreate);
                    }
                }
            }
        }
    }

    async listarProtocolos(){
        return await Protocolo.all();
    }

    async dadosProtocolo({params, response}){
        //Verifica se o parametro passado pela URL é valido
        if(params.id===null||params.id===''||parseInt(params.id)===undefined){
            return response.status(400).json({erro:{codigo:14,msg:'Parametros invalidos para consultar protocolo, parametro passado:'+params.id}})
        }else{
            //Pega os dados da empresa encontrada e atribui para dados
            const dados = await Protocolo.find(params.id)
            //verifica se encontrou algum protocolo
            //se nao encontrou retorna erro
            //se encontrar a empresa retorna os dados do protocolo encotrado
            if(dados === null){
                return response.status(404).json({erro:{codigo:15, msg:'Protocolo com ID:'+params.id+' nao encontrado'}})
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
                return response.status(403).json({erro:{codigo:16,msg:'Protocolo já está concluido'}})
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
