'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProtocoloSchema extends Schema {
  up () {
    this.create('protocolo', (table) => {
      table.increments()
      table.integer('atendente').references('usuario.id')
      table.integer('cliente').references('cliente.id')
      table.string('situacao', 1)
      table.integer('prioridade').references('prioridade.id')
      table.string('pessoaatendida', 100)
      table.string('motivo', 100)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('protocolo')
  }
}

module.exports = ProtocoloSchema
