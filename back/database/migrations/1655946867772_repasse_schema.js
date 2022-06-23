'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepasseSchema extends Schema {
  up () {
    this.create('repasse', (table) => {
      table.increments()
      table.integer('usuarioatual').references('usuario.id')
      table.integer('protocolo').references('protocolo.id')
      table.integer('usuariodestino').references('usuario.id')
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('repasse')
  }
}

module.exports = RepasseSchema
