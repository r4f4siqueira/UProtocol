'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObservacaoSchema extends Schema {
  up () {
    this.create('observacao', (table) => {
      table.increments()
      table.integer('protocolo').references('protocolo.id')
      table.integer('atendente').references('usuario.id')
      table.string('observacao', 8000)
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('observacao')
  }
}

module.exports = ObservacaoSchema
