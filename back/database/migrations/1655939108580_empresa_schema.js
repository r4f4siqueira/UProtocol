'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresaSchema extends Schema {
  up () {
    this.create('empresa', (table) => {
      table.increments()
      table.boolean('ativo')
      table.string('CNPJ_CPF', 18)
      table.string('razaosocial', 100)
      table.string('fantasia', 100)
      table.integer('criador')
      table.integer('userc')
      table.integer('userm')
      table.timestamps()
    })
  }

  down () {
    this.drop('empresa')
  }
}

module.exports = EmpresaSchema
