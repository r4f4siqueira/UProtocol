'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Rotas para pegar dados "get"
Route.get('/', () => {
  return { greeting: '404 api' }
})

Route.get('/protocolos', () => {
  return { greeting: 'Lista protocolos' }
})

Route.get('/protocolos/x', () => {
  return { greeting: 'Lista protocolo especifico' }
})

//Rotas para enviar dados "post"

Route.post('/protocolos', () => {
  return { greeting: 'Cria protocolos' }
})

//Rotas para alterar dados
Route.put('/protocolos/x', () => {
  return { greeting: 'Lista protocolos' }
})

//Rotas para excluir dados
Route.delete('/protocolos/x', () => {
  return { greeting: 'Lista protocolos' }
})