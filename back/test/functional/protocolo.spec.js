'use strict'



const { test } = use('Test/Suite')('Protocolo')
//Importando o arquivo controller
const ProtocoloController = require("../../app/controllers/Http/ProtocoloController")
//Instanciando ProtocoloController
const protocoloC = new ProtocoloController()

test('1 - Lista todos os Protocolos', async ({ assert }) => {
  let protocolos = await protocoloC.listarProtocolos()
  
  //pega a quantidade de registros de empresas
  let qtdRegistro = protocolos.rows.length //qtd = quantidade 
  
  //Caso nao ter nenhuma empresa cadastrada o retorno sera 0
  //caso nescessario use o console log para ver oque esta sendo retornado na funcao
  //console.log(qtdRegistro)

  //se a quantidade de registros for diferente de null e
  //diferente de undefined passa no teste
  //ou seja conseguiu listar as empresas
  assert.equal(true,qtdRegistro!==null&&qtdRegistro!==undefined)
})
