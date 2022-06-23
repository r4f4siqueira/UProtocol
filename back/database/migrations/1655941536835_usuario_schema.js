'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuario', (table) => {
      table.increments()
      table.boolean('ativo')
      table.string('nome', 100)
      table.string('email', 100)
      table.integer('conta').references('conta.id')
      table.integer('setor').references('setor.id')
      table.string('cargo')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuario')
  }
}

module.exports = UsuarioSchema
