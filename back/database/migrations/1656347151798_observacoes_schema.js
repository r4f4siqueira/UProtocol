'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObservacoesSchema extends Schema {
  up () {
    this.create('observacaos', (table) => {
      table.increments('id').primary()
      table.integer('protocolo').references('protocolos.id')
      table.integer('atendente')
      table.string('observacao', 8000)
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('observacaos')
  }
}

module.exports = ObservacoesSchema
