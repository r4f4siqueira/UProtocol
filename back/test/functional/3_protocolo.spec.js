'use strict'

//Verifique os comentarios do arquivo ./empresa.spec.js
const { test } = use('Test/Suite')('Protocolo')
//Importando o arquivo controller
const ProtocoloController = require("../../app/controllers/Http/ProtocoloController")
//Instanciando ProtocoloController
const protocoloC = new ProtocoloController()
const Database = use("Database");

test('1 - Lista todos os Protocolos', async ({ assert }) => {
  const dados= await Database.select("funcionario_uid","empresa").table('funcionario_empresas').where('funcionario_uid','teste')
  let protocolos = await protocoloC.listarProtocolos({
    request: {
      uid: dados[0].funcionario_uid,
      empresa: dados[0].empresa
    }
  })

  assert.equal('object',typeof (protocolos))
})

test('2 - Consulta PROTOCOLO: Valida parametros da URL', async({assert})=>{
  let protocolo = await protocoloC.dadosProtocolo({params:{id:null}})
  assert.equal(14,protocolo.erro.codigo)
})

// test('3 - Criar protocolo', async({assert})=>{
//   let protocolo = await protocoloC.dadosProtocolo({params:{id:0}})
//   assert.equal(15,protocolo.erro.codigo)
// })