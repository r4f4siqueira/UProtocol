'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionariosSchema extends Schema {
  up () {
    this.create('funcionarios', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('nome', 100)
      table.string('email', 100)
      table.string('uid')
      table.string('avatarURL')
      table.timestamps()
    })
  }

  down () {
    this.drop('funcionarios')
  }
}

module.exports = FuncionariosSchema
