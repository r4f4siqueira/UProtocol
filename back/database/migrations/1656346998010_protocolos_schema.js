'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProtocolosSchema extends Schema {
  up () {
    this.create('protocolos', (table) => {
      table.increments('id').primary()
      table.integer('atendente').references('funcionarios.id')
      table.integer('cliente').references('clientes.id')
      table.string('situacao', 1)
      table.integer('prioridade').references('prioridades.id')
      table.string('pessoaatendida', 100)
      table.string('motivo', 100)
      table.timestamp('previsao')
      table.integer('userc').references('funcionarios.id')
      table.integer('userm').references('funcionarios.id')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('protocolos')
  }
}

module.exports = ProtocolosSchema
