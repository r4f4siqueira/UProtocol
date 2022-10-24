'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnexosSchema extends Schema {
  up () {
    this.create('anexos', (table) => {
      table.increments('id').primary()
      table.integer('protocolo').references('protocolos.id')
      table.string('descricao', 100)
      table.string('anexo')//url
      table.integer('userc').references('funcionarios.id')
      table.integer('userm').references('funcionarios.id')
      table.integer('empresa').references('empresas.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('anexos')
  }
}

module.exports = AnexosSchema
