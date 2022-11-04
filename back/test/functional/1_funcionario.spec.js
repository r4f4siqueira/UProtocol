'use strict'

const { test } = use('Test/Suite')('Funcionario')
const FuncionarioController = require('../../App/controllers/Http/FuncionarioController')
const funcionarioC = new FuncionarioController()

let funcionarioTeste = ''

test('1 - Criar Funcionario', async ({ assert }) => {
  const dados = {
    "ativo": 1,
	  "nome": "Teste",
	  "email": "teste@teste.com",
	  "uid": "teste",
	  "avatarURL": null
  }
  funcionarioTeste = await funcionarioC.criarFuncionario({ request: dados, })
  assert.equal("teste",funcionarioTeste.uid)
})

test('2 - Consultar FUNCIONARIO: Valida parametros da URL', async ({ assert }) => {
  const uid = ""
  let funcionario = await funcionarioC.dadosFuncionario({ request: { uid }, })
  assert.equal(33,funcionario.erro.codigo)
})

test('3 - Consultar FUNCIONARIO: Inexistente', async({assert})=>{
  const uid = "T3st3"
  let funcionario = await funcionarioC.dadosFuncionario({ request: { uid }, })
  assert.equal(34,funcionario.erro.codigo)
})

test('4 - Alterar/atualizar FUNCIONARIO', async ({ assert }) => {
  const dados = {
    "ativo": 1,
	  "nome": "Teste 2",
	  "email": "teste@teste.com",
	  "uid": "teste",
	  "avatarURL": null
  }
  const id = funcionarioTeste.id
  let funcionarioAlterado = await funcionarioC.alterarFuncionario({ params: {id}, request: dados})
  assert.equal("Teste 2",funcionarioAlterado.nome)
})