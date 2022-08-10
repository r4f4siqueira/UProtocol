'use strict'

const { test } = use('Test/Suite')('Funcionario')
const FuncionarioController = require('../../App/controllers/Http/FuncionarioController')
const funcionarioC = new FuncionarioController()

const rotas = require('../../start/routes')

test('1 - Listar todos Funcionarios', async ({ assert }) => {
  //funcionarios recebe uma lista com todos os funcionarios cadastrados no sistema
  let funcionarios = await funcionarioC.listarFuncionario()
  //conta a quantidade de funcionarios cadastrados no sistema
  //caso tenha algum erro quantidade de registros será undefined
  let qtdRegistro = funcionarios.rows.length
  //espero que a quantidade de registro tenha pelomenos um tamanho, quando nao tem registro o tamanho sera 0
  assert.equal(true,qtdRegistro!=null&&qtdRegistro!=''&&qtdRegistro!=undefined)
})

test('2 - Consultar FUNCIONARIO: Valida parametros da URL', async ({assert})=>{
  //let funcionario = await funcionarioC.dadosFuncionario({params: {id:''}})
  console.log(funcionario)
  assert.equal(21,funcionario.erro.codigo)
})

test('3 - Consultar FUNCIONARIO: Inexistente', async({assert})=>{
  let funcionario = await funcionarioC.dadosFuncionario({params:{id:0}})
  assert.equal(22,funcionario.erro.codigo)
})