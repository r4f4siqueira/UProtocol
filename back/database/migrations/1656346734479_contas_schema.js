'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContasSchema extends Schema {
  up () {
    this.create('contas', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('clogin', 100)
      table.string('senha', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('contas')
  }
}

module.exports = ContasSchema
