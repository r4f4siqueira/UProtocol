'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorSchema extends Schema {
  up () {
    this.create('setor', (table) => {
      table.increments()
      table.boolean('ativo')
      table.string('nome', 100)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('setor')
  }
}

module.exports = SetorSchema
