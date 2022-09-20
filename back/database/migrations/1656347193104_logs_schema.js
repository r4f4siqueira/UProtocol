'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogsSchema extends Schema {
  up () {
    this.create('logs', (table) => {
      table.increments('id').primary()
      table.string('operacao', 100)
      table.string('tabela', 100)
      table.string('coluna', 100)
      table.json('valorantigo')
      table.json('valornovo')
      table.integer('funcionario')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('logs')
  }
}

module.exports = LogsSchema
