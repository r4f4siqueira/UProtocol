"use strict";
const Empresa = use("App/Models/Empresa");

class EmpresaController {
  async criarEmpresa({ request }) {
    //Criador = ID fornecida pelo firebase
    const dataToCreate = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador","userc",]);
    
    //Verifica se o usuario de criacao está preenchido
    //Se nao tiver passando USERC retorna erro
    //Se USERC tiver preenchido cria a empresa
    if(dataToCreate.criador===null){
      return {erro:{codigo:0,msg: 'UserC vazio'}}
    }else{
      return await Empresa.create(dataToCreate);      
    }
  }

  async listarEmpresas() {
    const dados = await Empresa.all();
    return dados;
  }

  async dadosEmpresa({ params }) {
    //Verifica se os parametros de ID são validos
    //se for válido busca a empresa no banco
    //se não encontre retorna null
    //Se encontrar retorna os dados da empresa

    if(params.id ==='' || parseInt(params.id)===undefined){
      return {erro:{codigo:1,msg: 'Parametros invalidos, parametro passado:'+params.id}}
    } else {
      const dados = await Empresa.find(params.id)
      if (dados === null){
        return {erro:{codigo:2,msg: 'Empresa com ID:'+params.id+" Nao existe"}}
      }else{
        return dados
      }
    }

    //return await Empresa.findOrFail(params.id);
    //find or Fail retorna coisa desnescessária, find é melhor para tratar
  }

  async alterarEmpresa({ params, request }) {
    const empresa = await Empresa.findOrFail(params.id); //Retorna erro caso nao encontrar
    const atualizaEmpresa = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador",,"userm",]);

    empresa.merge(atualizaEmpresa);

    await empresa.save();
    return empresa;
  }

  async deletarEmpresa({ params }) {
    //verifica se o parametro passado esta preenchido
    //se o parametro estiver preenchido ele busca a empresa
    //Se encotrar a empresa, ela sera deletada
    //caso nao encontre a empresa reteornara uma mensagem de erro
    if(params.id===''||params.id===null||params.id===undefined){
      return {erro:{codigo:3,msg: 'parametros preenchidos errados'}}
    }else{
      const empresa = await Empresa.find(params.id)
      if(empresa==null){
        return {erro:{codigo:4,msg: 'Empresa com ID:'+params.id+" Nao encontrada para deletar"}}
      }else{
        //variavel temporaria para mostrar os dados da empresa que foi deletada
        let temp = empresa
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
