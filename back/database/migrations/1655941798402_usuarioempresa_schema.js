'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioempresaSchema extends Schema {
  up () {
    this.create('usuarioempresa', (table) => {
      table.increments()
      table.integer('empresa').references('empresa.id')
      table.integer('usuario').references('usuario.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarioempresa')
  }
}

module.exports = UsuarioempresaSchema
