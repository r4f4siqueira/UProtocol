'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('nome', 100)
      table.string('email', 100)
      table.string('conta')
      table.integer('setor').references('setors.id')
      table.string('cargo')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
