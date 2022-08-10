'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioempresasSchema extends Schema {
  up () {
    this.create('funcionarioempresas', (table) => {
      table.increments('id').primary()
      table.integer('empresa').references('empresas.id')
      table.integer('funcionario').references('funcionarios.id')
      table.integer('setor').references('setors.id')
      table.string('cargo')
      table.timestamps()
    })
  }

  down () {
    this.drop('funcionarioempresas')
  }
}

module.exports = FuncionarioempresasSchema
