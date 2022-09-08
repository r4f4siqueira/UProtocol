'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')
class FuncionariosSchema extends Schema {
  async up () {
    this.create('funcionarios', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('nome', 100)
      table.string('email', 100).unique()
      table.string('uid').unique()
      table.string('avatarURL')
      table.timestamps()
    })
    await Database.table('setors').insert({ativo:1,nome:'Geral'})
  }

  down () {
    this.drop('funcionarios')
  }
}

module.exports = FuncionariosSchema
