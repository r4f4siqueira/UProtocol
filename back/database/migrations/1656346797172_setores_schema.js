'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetoresSchema extends Schema {
  up () {
    this.create('setors', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('nome', 100)
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }  

  down () {
    this.drop('setors')
  }
}

module.exports = SetoresSchema
