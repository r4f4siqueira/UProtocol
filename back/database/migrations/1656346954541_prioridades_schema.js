'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrioridadesSchema extends Schema {
  up () {
    this.create('prioridades', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('nome', 100)
      table.integer('ordemimportancia')
      table.string('userc')
      table.string('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('prioridades')
  }
}

module.exports = PrioridadesSchema
