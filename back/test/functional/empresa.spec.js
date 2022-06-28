'use strict'
const { test } = use('Test/Suite')('Empresa')
const EmpresaController = require('../../App/controllers/Http/EmpresaController')

test('Listar empresas', async ({ assert }) => {
  const empresas = new EmpresaController()
  const listar = await empresas.listarEmpresas()
  assert.equal(false,listar===undefined ? true : false)
})