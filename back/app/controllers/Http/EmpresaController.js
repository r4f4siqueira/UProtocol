"use strict";

const LogController = require("./LogController");
const logC = new LogController()

const Empresa = use("App/Models/Empresa");

class EmpresaController {
  async criarEmpresa({ request }) {
    //userc = ID fornecida pelo firebase
    const dataToCreate = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","userc"]);
    
    //Verifica se o usuario de criacao está preenchido
    //Se nao tiver passando USERC retorna erro
    //Se USERC tiver preenchido cria a empresa
    if(dataToCreate.criador===null){
      return {erro:{codigo:0,msg: 'Criador vazio'}}
    }else{
      //verifica se o parametro fantasia esta preenchido
      //se nao estiver preenchido retorna erro
      //se tiver preenchido cadastra a empresa no bd e retorna os dados que foram cadastrados
      if(dataToCreate.fantasia ===null || dataToCreate.fantasia===undefined){
        return {erro:{codigo:8,msg:'Nome ou Fantasia não preenchido'}}
      } else{ 
        return await Empresa.create(dataToCreate);
      }
    }
  }

  async listarEmpresas() {
    //Lista todas as empresas cadastradas
    return await Empresa.all();
  }

  async dadosEmpresa({ params }) {
    //Verifica se os parametros de ID são validos
    //se for válido busca a empresa no banco
    //se não encontre retorna null
    //Se encontrar retorna os dados da empresa

    if(params.id ==='' || parseInt(params.id)===undefined){
      return {erro:{codigo:2,msg: 'Parametros invalidos, parametro passado:'+params.id}}
    } else {
      const dados = await Empresa.find(params.id)
      if (dados === null){
        return {erro:{codigo:3,msg: 'Empresa com ID:'+params.id+" Nao encontrada"}}
      }else{
        return dados
      }
    }

    //return await Empresa.findOrFail(params.id);
    //find or Fail retorna coisa desnescessária, find é melhor para tratar
  }

  async alterarEmpresa({ params, request }) {
    //varifica se o parametro passado esta valido
    if(params.id ==='' || parseInt(params.id)===undefined){
      return {erro:{codigo:6,msg:'Parametro ID inválido'}}
    }else{
      //Se o parametro estiver valido busca os dados da empresa e atribui a variavel
      const empresa = await Empresa.find(params.id); 
      //Verifica se encontrou a empresa
      if(empresa === null){
        //Se empresa estiver nula retorna mensagem de erro
        return {erro:{codigo:7,msg:'Empresa com ID:'+params.id+' Nao encontrada'}}
      }else{
        //Se encontrar a empresa a variavel "atualizaEmpresa" recebe os dados passado pelo parametro request
        const atualizaEmpresa = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador","userm"]);
        //verifica se o campo de "usuerm" foi preenchido
        if(atualizaEmpresa.userm===null || atualizaEmpresa.userm===''){
          return {erro:{codigo:8,msg:'USERM invalido'}}
        }else{
          if(atualizaEmpresa.fantasia===null||atualizaEmpresa.fantasia===undefined){
            return {erro:{codigo:9,msg:"Nome ou Fantasia não preenchido"}}
          }else{
            //salva os dados antigos dentro da tabela de log
            //Como não estou verificando qual o dado que o usuario esta alterando entao salvo todos os dados da empresa no log
            //E tambem estou salvando todos os dados novos
            await logC.novoLog({request:{operacao:'ALTERAR',tabela:'Empresa',coluna:'',valorantigo:JSON.stringify(empresa),valornovo:JSON.stringify(atualizaEmpresa),user:atualizaEmpresa.userm,empresa:params.id}})
            //Em seguida a variavel empresa recebe os novos dados atraves de uma funcao ".merge"
            empresa.merge(atualizaEmpresa);
            //Depois persiste os dados da variavel empresa no banco de dados
            await empresa.save();
            //retorna os dados atualizados
            return empresa;
          }
        }
      }
    }
  }

  async deletarEmpresa({ params }) {
    //verifica se o parametro passado esta preenchido
    //se o parametro estiver preenchido ele busca a empresa
    //Se encotrar a empresa, ela sera deletada
    //caso nao encontre a empresa reteornara uma mensagem de erro
    if(params.id===''||params.id===null||params.id===undefined){
      return {erro:{codigo:4,msg: 'parametros preenchidos errados'}}
    }else{
      const empresa = await Empresa.find(params.id)
      if(empresa==null){
        return {erro:{codigo:5,msg: 'Empresa com ID:'+params.id+" Nao encontrada para deletar"}}
      }else{
        //variavel temporaria para mostrar os dados da empresa que foi deletada
        let temp = empresa
        //Funcao para gravar na tabela de log
        await logC.novoLog({request:{operacao:'DELETAR',tabela:'Empresa',coluna:'Empresa',valorantigo:temp.razaosocial,valornovo:'null',user:'nN4TfCisXFdapqgYzWdg29ohWHe2', empresa:params.id}})
        await empresa.delete()
        return temp
      }
      
    }
   
    /* const empresa = await Empresa.findOrFail(params.id);
    await empresa.delete();
    return { mensagem: "Empresa deletada" };*/
  }
}

module.exports = EmpresaController;
