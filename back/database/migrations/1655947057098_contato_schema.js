'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContatoSchema extends Schema {
  up () {
    this.create('contato', (table) => {
      table.increments()
      table.boolean('ativo')
      table.integer('cliente').references('cliente.id')
      table.string('telefone', 20)
      table.string('email', 100)
      table.string('pessoa', 100)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('contato')
  }
}

module.exports = ContatoSchema
