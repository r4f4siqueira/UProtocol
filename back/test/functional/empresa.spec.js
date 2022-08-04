'use strict'
const { test } = use('Test/Suite')('Empresa')
//Importando o arquivo controller
const EmpresaController = require('../../App/controllers/Http/EmpresaController')
//Instanciando o objeto controller
const empresaC = new EmpresaController()


test("1 - Listar todas empresas", async ({assert})=>{
  let empresas = await empresaC.listarEmpresas()
  
  //pega a quantidade de registros de empresas
  let qtdRegistro = empresas.rows.length //qtd = quantidade 
  
  //Caso nao ter nenhuma empresa cadastrada o retorno sera 0
  //caso nescessario use o console log para ver oque esta sendo retornado na funcao
  //console.log(qtdRegistro)

  //se a quantidade de registros for diferente de null e
  //diferente de undefined passa no teste
  //ou seja conseguiu listar as empresas
  assert.equal(true,qtdRegistro!==null&&qtdRegistro!==undefined)
})

test("2 - Consulta EMPRESA: Valida os parametros da URL", async ({assert})=>{
  //Passando parametros de URL inválida para consultar dados
  let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  //Esperando retono tratado pelo controller
  assert.equal(2,empresa.erro.codigo)
})

test('3 - Consulta EMPRESA: Inexistente', async ({ assert }) => {
  //passar os parametros como objeto pois é desta forma queo controller está esperando
  let idTeste = 0 //passa o id da empresa que quer consultart
  //Busca a empresa com o ID=0
  //Esperando que retorne null pois não temos a empresa 0
  let empresa = await empresaC.dadosEmpresa({params: {id:idTeste}})//pode colocar o ID da empresa direto no parametro, sem precisar criar uma variavel
  assert.equal(3,empresa.erro.codigo)
})

test("4 - Deletar EMPRESA: Valida os parametros da URL", async({assert})=>{
  let deletarEmpresa = await empresaC.deletarEmpresa({params:{id:''}})
  //let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  assert.equal(4,deletarEmpresa.erro.codigo)
})

test("5 - Deletar EMPRESA: inexistente", async({assert})=>{
  //Buscando os dados de uma empresa que nao existe
  let deletarEmpresa = await empresaC.deletarEmpresa({params:{id:0},request:{body:{userm:'byHbcMVq3fYb7mWi2VrU3cs7FlB2'}}})
  //let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  assert.equal(5,deletarEmpresa.erro.codigo)
})

test("6 - Alterar dados EMPRESA: Valida os parametros da URL", async({assert})=>{
  //Passando parametro invalido para a funcao "alterarEmpresa"
  let alterarEmpresa = await empresaC.alterarEmpresa({params:{id:''}})
  assert.equal(6,alterarEmpresa.erro.codigo)
})

test("7 - Alterar dados EMPRESA: Inexistente", async({assert})=>{
  let alterarEmpresa = await empresaC.alterarEmpresa({params:{id:0}})
  assert.equal(7,alterarEmpresa.erro.codigo)
})

//Para este teste passar precisa ter uma empresa cadastrada, caso contrário ira retornar erro de empresa nao encontrada
test('8 - Deletar EMPRESA: Sem userm',async({assert})=>{
  let deletarEmpresa = await empresaC.deletarEmpresa({params:{id:1},request:{body:{userm:''}}})
  assert.equal(17,deletarEmpresa.erro.codigo)
})