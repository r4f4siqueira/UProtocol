"use strict";
const Empresa = use("App/Models/Empresa");

class EmpresaController {
  async criarEmpresa({ request }) {
    const dataToCreate = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador","userc",]);
    return await Empresa.create(dataToCreate);
  }

  async listarEmpresas() {
    return await Empresa.all();
  }

  async dadosEmpresa({ params }) {
    return await Empresa.findOrFail(params.id);
  }

  async alterarEmpresa({ params, request }) {
    const empresa = await Empresa.findOrFail(params.id); //Retorna erro caso nao encontrar
    const atualizaEmpresa = request.only(["ativo","CNPJ_CPF","razaosocial","fantasia","criador",,"userm",]);

    empresa.merge(atualizaEmpresa);

    await empresa.save();
    return empresa;
  }

  async deletarEmpresa({ params }) {
    const empresa = await Empresa.findOrFail(params.id);
    await empresa.delete();
    return { mensagem: "Empresa deletada" };
  }
}

module.exports = EmpresaController;
