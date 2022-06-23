'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnexosSchema extends Schema {
  up () {
    this.create('anexos', (table) => {
      table.increments()
      table.integer('protocolo').references('protocolo.id')
      table.string('descricao', 100)
      table.string('anexo', 255)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('anexos')
  }
}

module.exports = AnexosSchema
