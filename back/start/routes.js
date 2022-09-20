"use strict";

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
const Route = use("Route");

//ROTAS PARA PEGAR DADOS "get"
Route.get("/", () => {
  return { msg: "TODAS AS ROTAS PRECISAM DE UID!!!",api: 'OK'};
}); //desativar esta rota assim que possivel

Route.get('/empresa','EmpresaController.listarEmpresas')
Route.get("/empresa/:id", "EmpresaController.dadosEmpresa");

Route.get("/conta", "ContaController.listarConta");
Route.get("/conta/:id", "ContaController.dadosConta");

Route.get("/setor/:empresa", "SetorController.listarSetores");
//Route.get("/setor/:id", "SetorController.dadosSetor");

Route.get("/funcionario", "FuncionarioController.dadosFuncionario");
//Route.get("/funcionario/:id", "FuncionarioController.dadosFuncionario");

Route.get("/funcionarioempresa", "FuncionarioEmpresaController.listarFuncionarioEmpresas");
Route.get("/funcionarioempresa/:id", "FuncionarioEmpresaController.dadosFuncionarioEmpresa");

Route.get("/cliente", "ClienteController.listarClientes");
Route.get("/cliente/:id", "ClienteController.dadosCliente");

Route.get("/prioridade", "PrioridadeController.listarPrioridades");
Route.get("/prioridade/:id", "PrioridadeController.dadosPrioridade");

Route.get("/protocolo", "ProtocoloController.listarProtocolos");
Route.get("/protocolo/:id", "ProtocoloController.dadosProtocolo");

Route.get("/repasse", "RepasseController.listarRepasses");
Route.get("/repasse/:id", "RepasseController.dadosRepasse");

Route.get("/contato", "ContatoController.listarContatos");
Route.get("/contato/:id", "RepasseController.dadosContato");

Route.get("/anexo", "AnexoController.listarAnexos");
Route.get("/anexo/:id", "AnexoController.dadosAnexo");

Route.get("/observacao", "ObservacaoController.listarObservacoes");
Route.get("/observacao/:id", "ObservacaoController.dadosObservacao");

Route.get("/log", "LogController.listarLogs");
Route.get("/log/:id", "LogcaoController.dadosLog");

//ROTAS PARA CRIAR DADOS "post"
Route.post("/empresa", "EmpresaController.criarEmpresa");
Route.post("/conta", "ContaController.criarConta");
Route.post("/setor", "SetorController.criarSetor");
Route.post("/funcionario", "FuncionarioController.criarFuncionario");
Route.post("/funcionarioempresa", "FuncionarioEmpresaController.criarFuncionarioEmpresa");
Route.post("/cliente", "ClienteController.criarCliente");
Route.post("/prioridade", "PrioridadeController.criarPrioridade");
Route.post("/protocolo", "ProtocoloController.criarProtocolo");
Route.post("/repasse", "RepasseController.criarRepasse");
Route.post("/contato", "ContatoController.criarContato");
Route.post("/anexo", "AnexoController.criarAnexo");
Route.post("/observacao", "ObservacaoController.criarObservacao");
Route.post("/log", "LogController.criarLog");

//ROTAS PARA ALTERAR DADOS
Route.put("/empresa/:id", "EmpresaController.alterarEmpresa");
Route.put("/conta/:id", "ContaController.alterarConta");
Route.put("/setor/:id", "SetorController.alterarSetor");
Route.put("/funcionario/:id", "FuncionarioController.alterarFuncionario");
Route.put("/funcionarioempresa", "FuncionarioEmpresaController.alterarFuncionarioEmpresa");
Route.put("/cliente/:id", "ClienteController.alterarCliente");
Route.put("/prioridade/:id", "PrioridadeController.alterarPrioridade");
Route.put("/protocolo/:id", "ProtocoloController.alterarProtocolo");
Route.put("/repasse/:id", "RepasseController.alterarRepasse");
Route.put("/contato/:id", "ContatoController.alterarContato");
Route.put("/anexo/:id", "AnexoController.alterarAnexo");
Route.put("/observacao/:id", "ObservacaoController.alterarObservacao");
Route.put("/log/:id", "LogController.alterarLog");

//ROTAS PARA EXCLUIR DADOS

Route.delete("/empresa/:id", "EmpresaController.deletarEmpresa");
Route.delete("/conta/:id", "ContaController.deletarConta");
Route.delete("/setor/:id", "SetorController.deletarSetor");
Route.delete("/funcionario/:id", "FuncionarioController.deletarFuncionario");
Route.delete("/funcionarioempresa/:id", "FuncionarioEmpresaController.deletarFuncionarioEmpresa");
Route.delete("/cliente/:id", "ClienteController.deletarCliente");
Route.delete("/prioridade/:id", "PrioridadeController.deletarPrioridade");
Route.delete("/protocolo/:id", "ProtocoloController.deletarProtocolo");
Route.delete("/repasse/:id", "RepasseController.deletarRepasse");
Route.delete("/contato/:id", "ContatoController.deletarContato");
Route.delete("/anexo/:id", "AnexoController.deletarAnexo");
Route.delete("/observacao/:id", "ObservacaoController.deletarObservacao");
Route.delete("/log/:id", "LogController.deletarLog");
