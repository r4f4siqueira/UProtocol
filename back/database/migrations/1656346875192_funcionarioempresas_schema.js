'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioempresasSchema extends Schema {
  up () {
    this.create('funcionario_empresas', (table) => {
      table.increments('id').primary()
      table.integer('empresa').references('empresas.id')
      table.integer('funcionario').references('funcionarios.id')
      table.string('funcionario_uid')
      table.integer('setor').references('setors.id')
      table.string('cargo',1)
      table.integer('userc').references('funcionarios.id')
      table.integer('userm').references('funcionarios.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('funcionario_empresas')
  }
}

module.exports = FuncionarioempresasSchema
