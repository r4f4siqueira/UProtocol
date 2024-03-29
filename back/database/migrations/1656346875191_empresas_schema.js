'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmpresasSchema extends Schema {
  up () {
    this.create('empresas', (table) => {
      table.increments('id').primary()
      table.boolean('ativo')
      table.string('CNPJ_CPF', 18).unique()
      table.string('razaosocial', 100)
      table.string('fantasia', 100)
      table.integer('userc').references('funcionarios.id')
      table.integer('userm')
      table.timestamps()
    })
  }

  down () {
    this.drop('empresas')
  }
}

module.exports = EmpresasSchema
