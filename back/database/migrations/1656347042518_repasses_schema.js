'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepassesSchema extends Schema {
  up () {
    this.create('repasses', (table) => {
      table.increments('id').primary()
      table.integer('funcionarioatual').references('funcionarios.id')
      table.integer('protocolo').references('protocolos.id')
      table.integer('funcionariodestino')
      table.integer('setor')
      table.integer('userc')
      table.integer('userm')
      table.integer('empresa')
      table.timestamps()
    })
  }

  down () {
    this.drop('repasses')
  }
}

module.exports = RepassesSchema
