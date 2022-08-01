'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContatosSchema extends Schema {
  up () {
    this.create('contatos', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.integer('cliente').references('clientes.id')
      table.string('telefone', 20)
      table.string('email', 100)
      table.string('pessoa', 100)
      table.string('userc')
      table.string('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('contatos')
  }
}

module.exports = ContatosSchema
