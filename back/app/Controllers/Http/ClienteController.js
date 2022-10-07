"use strict";

const Database = use("Database");
const Cliente = use("App/Models/Cliente");

const LogController = require("./LogController");
const logC = new LogController();
class ClienteController {
    async criarCliente({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only([
            "ativo",
            "razaosocial",
            "fantasia",
            "CNPJ_CPF",
            "empresa",
            "uid",
        ]);
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);
        if (
            userc[0]?.id === null ||
            userc[0]?.id === undefined ||
            userc[0]?.setor === null
        ) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 60,
                    msg: "Funcionário não vinculado a empresa para cadastrar cliente",
                },
            };
        } else {
            if (
                dadosRequest.fantasia === "" ||
                dadosRequest.fantasia === null
            ) {
                response?.status(400);
                retorno = {
                    erro: {
                        codigo: 61,
                        msg: "Nome fantasia é obrigatório ser informado",
                    },
                };
            } else {
                retorno = await Cliente.create({
                    ativo: dadosRequest.ativo,
                    razaosocial: dadosRequest.razaosocial,
                    fantasia: dadosRequest.fantasia,
                    CNPJ_CPF: dadosRequest.CNPJ_CPF,
                    userc: userc[0].funcionario,
                    empresa: dadosRequest.empresa,
                });
            }
        }

        //return await Cliente.create(dadpsRequest);
        return retorno;
    }

    async listarClientes({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only(["uid", "empresa"]);
        const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa);

        if (user?.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 62,
                    msg: "Funcionario não vinculado a empresa para listar clientes",
                },
            };
        } else {
            retorno = await Database.select(
                "clientes.*",
                "funcionarios.nome as userc_nome",
                "empresas.fantasia as empresa_nome"
            )
                .table("clientes")
                .innerJoin("funcionarios", "funcionarios.id", "clientes.userc")
                .innerJoin("empresas", "empresas.id", "clientes.empresa")
                .where("empresa", dadosRequest.empresa);

            retorno.every((lista) => {
                lista.empresa = {
                    id: lista.empresa,
                    nome: lista.empresa_nome,
                };
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome,
                };
                lista.empresa_nome = undefined;
                lista.userc_nome = undefined;
                return true;
            });
        }

        return retorno;
    }

    async dadosCliente({ params, request, response }) {
        return await Cliente.findOrFail(params.id);
    }

    async alterarCliente({ params, request, response }) {
        let retorno = "";
        const cliente = await Cliente.find(params.id);
        if (cliente === null) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 66,
                    msg: "Cliente não encontrado para ser alterado",
                },
            };
        } else {
            const dadosRequest = request.only([
                "ativo",
                "razaosocial",
                "fantasia",
                "CNPJ_CPF",
                "uid",
                "empresa",
            ]);
            if (
                dadosRequest.uid === null ||
                dadosRequest.uid === "" ||
                dadosRequest.uid === undefined
            ) {
                response?.status(400);
                retorno = {
                    erro: {
                        codigo: 67,
                        msg: "uid não Informada",
                    },
                };
            } else {
                if (
                    dadosRequest.fantasia === null ||
                    dadosRequest.fantasia === undefined ||
                    dadosRequest.fantasia === ""
                ) {
                    response?.status(400);
                    retorno = {
                        erro: {
                            codigo: 69,
                            msg: "Razão Social ou Nome não informados",
                        },
                    };
                } else {
                    const userm = await Database.select("*")
                        .table("funcionario_empresas")
                        .where("funcionario_uid", dadosRequest.uid)
                        .where("empresa", dadosRequest.empresa);

                    if (userm?.length === 0) {
                        response?.status(404);
                        retorno = {
                            erro: {
                                codigo: 68,
                                msg: "Funcionário não vinculado a empresa para alterar dados do Cliente",
                            },
                        };
                    } else {
                        await logC.novoLog({
                            request: {
                                operacao: "ALTERAR",
                                tabela: "clientes",
                                coluna: "",
                                valorantigo: JSON.stringify({
                                    ativo: cliente.ativo,
                                    razaosocial: cliente.razaosocial,
                                    fantasia: cliente.fantasia,
                                    CNPJ_CPF: cliente.CNPJ_CPF,
                                }),
                                valornovo: JSON.stringify({
                                    ativo: dadosRequest.ativo,
                                    razaosocial: dadosRequest.razaosocial,
                                    fantasia: dadosRequest.fantasia,
                                    CNPJ_CPF: dadosRequest.CNPJ_CPF,
                                }),
                                funcionario: userm[0].funcionario,
                                empresa: dadosRequest.empresa,
                            },
                        });

                        cliente.merge({
                            ativo: dadosRequest.ativo,
                            razaosocial: dadosRequest.razaosocial,
                            fantasia: dadosRequest.fantasia,
                            CNPJ_CPF: dadosRequest.CNPJ_CPF,
                            userm: userm[0].funcionario,
                        });
                        let teste = await cliente.save();
                        if (teste) {
                            retorno = cliente;
                        } else {
                            response?.status(500);
                            retorno = {
                                erro: {
                                    codigo: 70,
                                    msg: "Algo deu errado em salvar cliente",
                                },
                            };
                        }
                    }
                }
            }
        }
        // const atualizaCliente = request.only(['ativo','razaosocial','fantasia','CNPJ_CPF','userm'])

        // cliente.merge(atualizaCliente);

        // await cliente.save();
        return retorno;
    }

    async deletarCliente({ params, request, response }) {
        let retorno = "";
        const cliente = await Cliente.find(params.id);
        if (!cliente) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 71,
                    msg: "Cliente não encontrado para ser deletado",
                },
            };
        } else {
            const dadosRequest = request.only(["uid", "empresa"]);
            if (!dadosRequest.uid) {
                response?.status(400);
                retorno = {
                    erro: {
                        codigo: 72,
                        msg: "Não informada UID para excluir cliente",
                    },
                };
            } else {
                const userm = await Database.select("*")
                    .table("funcionario_empresas")
                    .where("funcionario_uid", dadosRequest.uid)
                    .where("empresa", dadosRequest.empresa);

                if (userm[0]?.empresa !== cliente.empresa) {
                    response?.status(404);
                    retorno = {
                        erro: {
                            codigo: 73,
                            msg: "Usuario não cadastrado ou não vinculado a empresa para excluir cliente",
                        },
                    };
                } else {
                    // VERIFICADOR
                    //caso o cliente tiver um protocolo vinculado não será possivel excluir o cliente apenas desativar
                    const verificador = await Database.select("id")
                        .table("protocolos")
                        .where("cliente", cliente.id)
                        .first();

                    if (verificador) {
                        response?.status(403);
                        retorno = {
                            erro: {
                                codigo: 74,
                                msg: "Não foi possivel excluir, cliente tem um ou mais protocolos vinculados",
                            },
                        };
                    } else {
                        await logC.novoLog({
                            request: {
                                operacao: "EXCLUIR",
                                tabela: "clientes",
                                coluna: "",
                                valorantigo: JSON.stringify(cliente),
                                valornovo: null,
                                funcionario: userm[0].funcionario,
                                empresa: userm[0].empresa,
                            },
                        });

                        //Função para deletar todos os contatos relacionados ao cliente
                        await Database.table("contatos")
                            .where("cliente", cliente.id)
                            .where("empresa", userm[0].empresa)
                            .delete();

                        //Função para remover o cliente
                        retorno = cliente;
                        await cliente.delete();
                    }
                    //retorno = 'fazer função no contato para exluir todos os contatos vinculados a este cliente'
                }
            }
        }
        return retorno;
    }
}

module.exports = ClienteController;
