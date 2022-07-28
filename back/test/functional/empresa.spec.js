'use strict'
const { test } = use('Test/Suite')('Empresa')
const EmpresaController = require('../../App/controllers/Http/EmpresaController')

test('Listar empresas', async ({ assert }) => {
  const empresas = new EmpresaController()
  //passar os parametros como objeto pois é desta forma queo controller está esperando
  const empresa = await empresas.dadosEmpresa({params: {id:1}})
  assert.equal(empresa.razaosocial,empresa.razaosocial ==='Up razao' ? empresa.razaosocial : false)
})