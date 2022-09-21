"use strict";

const Database = use("Database");
const FuncionarioEmpresa = use("App/Models/FuncionarioEmpresa");

const LogController = require("./LogController");
const logC = new LogController();

class FuncionarioEmpresaController {
    async criarFuncionarioEmpresa({ request, response }) {
        let retorno = "";
        const dados = request.only(["uid", "email", "empresa", "cargo"]);
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dados.uid)
            .where("empresa", dados.empresa);
        if (userc[0] === null || userc[0] === undefined || userc[0] === []) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 46,
                    msg: "Funcionário não encontrado no sistema para Convidar funcionário",
                },
            };
        } else {
            if (userc[0].cargo === "F") {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 47,
                        msg: "Funcionario sem permissão para convidar funcionario",
                    },
                };
            } else {
                const funcionario = await Database.select("*")
                    .table("funcionarios")
                    .where("email", dados.email);
                if (funcionario[0] === null || funcionario[0] === undefined) {
                    response?.status(404);
                    retorno = {
                        erro: { codigo: 48, msg: "Funcionário Não Encontrado" },
                    };
                } else {
                    const funcionario_empresa = await Database.select("*")
                        .table("funcionario_empresas")
                        .where("empresa", dados.empresa)
                        .where("funcionario", funcionario[0].id);
                    if (funcionario_empresa[0]?.id) {
                        response?.status(403);
                        retorno = {
                            erro: {
                                codigo: 49,
                                msg: "Funcionário já vinculado a empresa ou pendente de resposta",
                            },
                        };
                    } else {
                        retorno = await FuncionarioEmpresa.create({
                            empresa: dados.empresa,
                            funcionario: funcionario[0].id,
                            funcionario_uid: funcionario[0].uid,
                            cargo: dados.cargo,
                            userc: userc[0].funcionario,
                        });
                    }
                }
            }
        }
        return retorno;
    }

    //Funcao para ser usada por dentro dos controllers
    async vinculaFuncionarioEmpresa({ request }) {
        //passar a request como um objeto ex:
        //{request:{empresa:1,funcionario:1,setor:1,cargo:'A'}}
        await FuncionarioEmpresa.create(request);
    }

    async listarFuncionarioEmpresas({ request, response }) {
        let retorno = "";
        const dados = request.only(["uid", "empresa"]);
        const verificador = await Database.select("empresa")
            .table("funcionario_empresas")
            .where("funcionario_uid", dados.uid)
            .where("empresa", dados.empresa);
        if (verificador[0]?.empresa === undefined) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 50,
                    msg: "Funcionário Não vinculado a empresa para listar os funcionários",
                },
            };
        } else {
            retorno = await Database.select(
                "funcionario_empresas.*",
                "funcionarios.nome",
                "funcionarios.email"
            )
                .table("funcionario_empresas")
                .innerJoin(
                    "funcionarios",
                    "funcionario_empresas.funcionario",
                    "funcionarios.id"
                )
                .where("empresa", dados.empresa);
        }
        return retorno;
        //return await FuncionarioEmpresa.all();
    }

    async dadosFuncionarioEmpresa({ params }) {
        return await FuncionarioEmpresa.findOrFail(params.id);
    }

    async verificaVinculo(uid, empresa) {
        const result = await Database.table("funcionario_empresas")
            .where("funcionario_uid", uid)
            .where("empresa", empresa);
        return result.length !== 0;
    }

    async alterarFuncionarioEmpresa({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only([
            "uid",
            "empresa",
            "funcionario",
            "setor",
            "cargo",
            "id",
        ]);
        const userm = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);
        if (userm[0]?.cargo === undefined) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 51,
                    msg: "Funcionário Não vinculado a empresa para alterar funcionários",
                },
            };
        } else {
            if (userm[0]?.cargo === "F") {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 52,
                        msg: "Funcionário sem permissão para alterar funcionários",
                    },
                };
            } else {
                const funcionario = await FuncionarioEmpresa.find(
                    dadosRequest.id
                );
                await logC.novoLog({
                    request: {
                        operacao: "ALTERAR",
                        tabela: "funcionario_empresas",
                        coluna: "",
                        valorantigo: JSON.stringify({
                            setor: funcionario.setor,
                            cargo: funcionario.cargo,
                        }),
                        valornovo: JSON.stringify({
                            setor: dadosRequest.setor,
                            cargo: dadosRequest.cargo,
                        }),
                        funcionario: userm[0].funcionario,
                        empresa: dadosRequest.empresa,
                    },
                });

                // const funcionario = await Database.select('*')
                // .table('funcionario_empresas')
                // .where('funcionario',dadosRequest.funcionario)
                // .where('empresa',dadosRequest.empresa)
                //merge não é a melhor função para realizar esta operação(minha opinião)
                funcionario.merge({
                    id: funcionario.id,
                    empresa: funcionario.empresa,
                    funcionario: funcionario.funcionario,
                    funcionario_uid: funcionario.funcionario_uid,
                    setor: dadosRequest.setor,
                    cargo: dadosRequest.cargo,
                    userc: funcionario.userc,
                    userm: userm.funcionario,
                });
                await funcionario.save();
                retorno = funcionario;
            }
        }
        return retorno;
    }

    async deletarFuncionarioEmpresa({ params, request, response }) {
        let retorno = "";
        const dadosRequest = request.only(["uid", "empresa"]);
        const userm = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);
        if (userm[0]?.cargo === undefined) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 53,
                    msg: "Funcionário não vinculado a empresa para remover funcionario",
                },
            };
        } else {
            if (userm[0]?.cargo === "F") {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 54,
                        msg: "Funcionário sem permissão para remover funcionário",
                    },
                };
            } else {
                const funcionarioEmpresa = await FuncionarioEmpresa.find(
                    params.id
                );
                if (funcionarioEmpresa === null) {
                    response?.status(404);
                    retorno = {
                        erro: {
                            codigo: 55,
                            msg: "O vinculo de Funcionário e empresa não foi encontrado para ser removido",
                        },
                    };
                } else {
                    const criadorEmpresa = await Database.select("userc")
                        .table("empresas")
                        .where("id", dadosRequest.empresa);
                    if (
                        funcionarioEmpresa.funcionario ===
                        criadorEmpresa[0].userc
                    ) {
                        response?.status(403);
                        retorno = {
                            erro: {
                                codigo: 56,
                                msg: "Criador da empresa não pode ser removido",
                            },
                        };
                    } else {
                        retorno = funcionarioEmpresa;
                        await logC.novoLog({
                            request: {
                                operacao: "EXCLUIR",
                                tabela: "funcionario_empresas",
                                coluna: "",
                                valorantigo: JSON.stringify(funcionarioEmpresa),
                                valornovo: JSON.stringify("Deletado"),
                                funcionario: userm[0].funcionario,
                                empresa: dadosRequest.empresa,
                            },
                        });
                        await funcionarioEmpresa.delete();
                    }
                }
            }
        }
        return retorno;
    }

    async aceitarConvite({ params, request, response }) {
        let retorno = "";
        const dadosRequest = request.only(["uid", "resposta"]);
        const funcionario_empresa = await FuncionarioEmpresa.find(params.id);
        if (funcionario_empresa?.funcionario_uid !== dadosRequest.uid) {
            response?.status(403);
            retorno = {
                erro: {
                    codigo: 57,
                    msg: "Sem permissão para aceitar convite de outro funcionário",
                },
            };
        } else {
            if (dadosRequest.resposta) {
                funcionario_empresa.merge({
                    setor: 1,
                });
                await funcionario_empresa.save();
                retorno = funcionario_empresa;
            } else {
                await funcionario_empresa.delete();
                retorno = { msg: "convite recusado" };
            }
        }
        return retorno;
    }

    async listarConvite({ request }) {
        const dadosRequest = request.only(["uid"]);
        return await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .whereNull("setor");
    }
}

module.exports = FuncionarioEmpresaController;
