'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrioridadeSchema extends Schema {
  up () {
    this.create('prioridade', (table) => {
      table.increments()
      table.boolean('ativo')
      table.string('nome', 100)
      table.integer('ordemimportancia')
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('prioridade')
  }
}

module.exports = PrioridadeSchema
