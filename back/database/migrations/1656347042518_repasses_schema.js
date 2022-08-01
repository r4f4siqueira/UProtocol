'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepassesSchema extends Schema {
  up () {
    this.create('repasses', (table) => {
      table.increments('id').primary()
      table.integer('usuarioatual').references('usuarios.id')
      table.integer('protocolo').references('protocolos.id')
      table.integer('usuariodestino').references('usuarios.id')
      table.string('userc')
      table.string('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('repasses')
  }
}

module.exports = RepassesSchema
