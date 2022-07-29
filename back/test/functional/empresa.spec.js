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

test("2 - Consultar empresa: Valida os parametros da URL", async ({assert})=>{
  //Passando URL inválida para consultar dados
  let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  //Esperando retono tratado pelo controller
  assert.equal(1,empresa.erro.codigo)
})

test('3 - Consulta empresa: inexistente', async ({ assert }) => {
  //passar os parametros como objeto pois é desta forma queo controller está esperando
  let idTeste = 0 //passa o id da empresa que quer consultart
  //Busca a empresa com o ID=0
  //Esperando que retorne null pois não temos a empresa 0
  let empresa = await empresaC.dadosEmpresa({params: {id:idTeste}})
  assert.equal(2,empresa.erro.codigo)
})

test("4 - Deletar empresa: Valida os parametros da URL", async({assert})=>{
  let deletarEmpresa = await empresaC.deletarEmpresa({params:{id:''}})
  //let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  assert.equal(3,deletarEmpresa.erro.codigo)
})

test("5 - Deletar empresa: inexistente", async({assert})=>{
  let deletarEmpresa = await empresaC.deletarEmpresa({params:{id:0}})
  //let empresa = await empresaC.dadosEmpresa({params: {id:''}})
  assert.equal(4,deletarEmpresa.erro.codigo)
})