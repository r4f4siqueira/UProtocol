"use strict";

const Database = use('Database')

const LogController = require("./LogController");
const logC = new LogController()
const FuncionarioEmpresaController = require('./FuncionarioEmpresaController')
const funcionarioEmpresaC = new FuncionarioEmpresaController()
//const FuncionarioController = require('./FuncionarioController')
//const funcionarioC = new FuncionarioController()

const Empresa = use("App/Models/Empresa");


class EmpresaController {
  async criarEmpresa({ request,response }) {
    //userc = ID fornecida pelo firebase
    const dataToCreate = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","uid"]);
    
    //Verifica se o usuario de criacao está preenchido
    //Se nao tiver passando USERC retorna erro
    //Se USERC tiver preenchido cria a empresa
    if(dataToCreate.uid===null){
      response?.status(400)
      return {erro:{codigo:0,msg: 'UID vazio para cadastrar nova empresa'}}
    }else{
      //variavel recebe a funcao para consultar a ID do usuario no banco de dados
      //funcao retorna um array de objetos
      //para acessar a informacao que eu quero, preciso saber a posicao do objeto no array e qual o atributo que preciso pegar
      //no caso para usar o id retornado preciso utilizar a variavel da seguinte forma:
      //idUser[0].id desta forma ira pegar somente o numero da id
      const idUser = await Database.select('*').table('funcionarios').where('uid',dataToCreate.uid)
      //verifica se encontrou o usuario no banco de dados
      if (idUser.length===0){
        response?.status(404)
        return {erro:{codigo:22,msg:'Funcionario nao encontrado no banco de dados'}}
      }else{

        //verifica se o parametro fantasia esta preenchido
        //se nao estiver preenchido retorna erro
        //se tiver preenchido cadastra a empresa no bd e retorna os dados que foram cadastrados
        if(dataToCreate.fantasia ===null || dataToCreate.fantasia===undefined){
          response?.status(400)
          return {erro:{codigo:1,msg:'Nome ou Fantasia não preenchido para criar empresa'}}
        } else{
          
          
          //salvar a empresa para depois fazer o vinculo da empresa com o usuario que criou
          //variavel idEmpresa recebe o retorno dos dados salvos no banco para poder pegar o id da empresa cadastrada
          const novaEmpresa = await Empresa.create({
            ativo:dataToCreate.ativo,
            CNPJ_CPF:dataToCreate.CNPJ_CPF,
            razaosocial:dataToCreate.razaosocial,
            fantasia:dataToCreate.fantasia,
            userc:idUser[0].id
          });
          //Fazer o vinculo do ususario na empresa criada
          await funcionarioEmpresaC.vinculaFuncionarioEmpresa({request:{funcionario:idUser[0].id,empresa:novaEmpresa.id,cargo:'A',userc:idUser[0].id,funcionario_uid:idUser[0].uid}})
          //retrnando os dados da empresa cadastrada
          return novaEmpresa
        }
      }
    }
  }

  async listarEmpresas() {
    //Lista todas as empresas cadastradas
    return await Empresa.all();
  }

  async dadosEmpresa({ params, response }) {
    //Verifica se os parametros de ID são validos
    //se for válido busca a empresa no banco
    //se não encontre retorna null
    //Se encontrar retorna os dados da empresa

    if(params.id===null||params.id ==='' || parseInt(params.id)===undefined){
      response?.status(400)
      return {erro:{codigo:2,msg: 'Parametros invalidos para buscar dados, parametro passado:'+params.id}}
    } else {
      const dados = await Empresa.find(params.id)
      if (dados === null){
        response?.status(404)
        return {erro:{codigo:3,msg: 'Empresa com ID:'+params.id+" Nao encontrada para buscar os dados"}}
      }else{
        return dados
      }
    }

    //return await Empresa.findOrFail(params.id);
    //find or Fail retorna coisa desnescessária, find é melhor para tratar
  }

  async alterarEmpresa({ params, request, response }) {
    //varifica se o parametro passado esta valido
    if(params.id ==='' || parseInt(params.id)===undefined||params.id===null){
      response?.status(400)
      return {erro:{codigo:6,msg:'Parametro ID inválido para alterar os dados da empresa'}}
    }else{
      //Se o parametro estiver valido busca os dados da empresa e atribui a variavel
      const empresa = await Empresa.find(params.id); 
      //Verifica se encontrou a empresa
      //Se nao encontrar a empresa retorna mensagem de erro
      if(empresa === null){
        response?.status(404)
        return {erro:{codigo:7,msg:'Empresa com ID:'+params.id+' Nao encontrada para alterar os dados'}}
      }else{
        //Se encontrar a empresa a variavel "atualizaEmpresa" recebe os dados passado pelo parametro request
        const atualizaEmpresa = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador","uid"]);//uid de quem ta alterando a empresa
        //verifica se o campo de "uid" foi preenchido
        if(atualizaEmpresa.uid===null || atualizaEmpresa.uid===''||atualizaEmpresa.uid===undefined){
          response?.status(400)
          return {erro:{codigo:8,msg:'UID invalido para alterar dados da empresa'}}
        }else{
          const idUser = await Database.select('id','nome').table('funcionarios').where('uid',atualizaEmpresa.uid)
          //verifica se encontrou o funcionario no banco de dados
          //se nao encontrar o funcionario retorna erro
          //se encontrar verifica se ele tem permissao para laterar os dados da empresa
          if (idUser.length===0){
            response?.status(404)
            return {erro:{codigo:23,msg:'Funcionario nao encontrado no banco de dados'}}
          }else{
            //busca no banco de dados o funcionario vinculado a empresa
            const funcionarioEmpresa = await Database.select('*').table('funcionario_empresas').where('funcionario',idUser[0].id).where('empresa',empresa.id)
            
            //verifica se encontrou o funcionario vinculado a empresa
            if(funcionarioEmpresa.length===0){
              response?.status(404)
              return {erro:{codigo:25,msg:'Funcionario nao esta vinculado a esta empresa'}}
            }else{
              //verifica se o funcionario tem permissao para poder fazer as alteracoes
              //se nao tiver permissao retorna erro
              if(funcionarioEmpresa[0].cargo !=='A'){
                response?.status(403)
                return {erro:{codigo:24,msg:'Funcionario sem permissao para alterar os dados da empresa'}}
              }else{
                if(atualizaEmpresa.fantasia===null||atualizaEmpresa.fantasia===undefined){
                  response?.status(400)
                  return {erro:{codigo:9,msg:"Nome ou Fantasia não preenchido para alterar dados da empresa"}}
                }else{
                  //salva os dados antigos dentro da tabela de log
                  //Como não estou verificando qual o dado que o usuario esta alterando entao salvo todos os dados da empresa no log
                  //E tambem estou salvando todos os dados novos
                  await logC.novoLog({request:{operacao:'ALTERAR',tabela:'Empresa',coluna:'',valorantigo:JSON.stringify(empresa),valornovo:JSON.stringify(atualizaEmpresa),funcionario:funcionarioEmpresa[0].funcionario,empresa:params.id}})
                  //removo o atributo UID pois na empresa não guarda esta informacão
                  delete atualizaEmpresa.uid
                  //Em seguida a variavel empresa recebe os novos dados atraves de uma funcao ".merge"
                  empresa.merge(atualizaEmpresa);
                  empresa.userm = funcionarioEmpresa[0].funcionario
                  
                  //Depois persiste os dados da variavel empresa no banco de dados
                  await empresa.save();
                  //retorna os dados atualizados
                  return empresa;
                }
              }
            }
          }
        }
      }
    }
  }

  async deletarEmpresa({ params,request, response}) {
    //verifica se o parametro passado esta preenchido
    //se o parametro estiver preenchido ele busca a empresa
    //Se encotrar a empresa, ela sera deletada
    //caso nao encontre a empresa reteornara uma mensagem de erro
    if(params.id===''||params.id===null||params.id===undefined){
      response?.status(400)
      return {erro:{codigo:4,msg: 'parametros preenchidos errados para deletar empresa'}}
    }else{
      const empresa = await Empresa.find(params.id)
      if(empresa==null){
        response?.status(404)
        return {erro:{codigo:5,msg: 'Empresa com ID:'+params.id+" Nao encontrada para deletar"}}
      }else{
        const dados = request?.only(['uid'])
        //busca o UID para inserir no log e verificar permissao para deletar
        //se nao tiver UID nao deleta
        //se tiver faz as verificacoes
        if(dados.uid===''||dados.uid===null||dados.uid===undefined){
          response?.status(400)
          return {erro:{codigo:17,msg:'UID não preenchido para DELETAR empresa'}}
        }else{
          //pega as informacoes do usuario no banco de dados
          const idUser = await Database.select('id','nome').table('funcionarios').where('uid',dados.uid)
          //verifica se encontrou o funcionario no banco de dados
          //se encontrar verifica se tem permissao para excuir
          if(idUser.length===0){
            response?.status(404)
            return {erro:{codigo:26,msg:'Funcionario nao encontrado no banco de dados para DELETAR os dados da empresa'}}
          }else{
            //busca no banco de dados o funcionario vinculado a empresa
            const funcionarioEmpresa = await Database.select('*').table('funcionario_empresas').where('funcionario',idUser[0].id).where('empresa',empresa.id)
            if(funcionarioEmpresa.length===0){
              response?.status(404)
              return {erro:{codigo:27,msg:'Funcionario nao vinculado a empresa para DELETAR'}}
            }else{
              //verificando se o funcionario pode deletar a empresa
              if(funcionarioEmpresa[0].cargo!=='A'){
                response?.status(403)
                return {erro:{codigo:28,msg:'Funcionario sem permissao para DELETAR empresa'}}
              }else{
                const temp = empresa
                await logC.novoLog({request:{operacao:'DELETAR',tabela:'Empresa',coluna:'',valorantigo:'ID da empresa:'+temp.id+' - Nome:'+temp.fantasia+' - CNPJ_CPF:'+temp.CNPJ_CPF,valornovo:'DELETADO',funcionario:funcionarioEmpresa[0].funcionario, empresa:params.id}})
                await Database.table('funcionario_empresas').where('empresa',temp.id).delete()
                await empresa.delete()
                return temp 
              }              
            }
          }
        }
      }
    }
  }
}

module.exports = EmpresaController;
