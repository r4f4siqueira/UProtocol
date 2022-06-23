'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClienteSchema extends Schema {
  up () {
    this.create('cliente', (table) => {
      table.increments()
      table.boolean('ativo')
      table.string('razaosocial', 100)
      table.string('fantasia', 100)
      table.string('CNPJ_CPF', 18)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('cliente')
  }
}

module.exports = ClienteSchema
