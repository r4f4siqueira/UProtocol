'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioempresasSchema extends Schema {
  up () {
    this.create('usuarioempresas', (table) => {
      table.increments('id').primary()
      table.integer('empresa').references('empresas.id')
      table.string('usuario')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarioempresas')
  }
}

module.exports = UsuarioempresasSchema
