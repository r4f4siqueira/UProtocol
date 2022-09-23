"use strict";

const Database = use("Database");

const LogController = require("./LogController");
const logC = new LogController();

const Setor = use("App/Models/Setor");
class SetorController {
    async criarSetor({ request, response }) {
        let retorno = "";
        const dadosEnviados = request.only(["ativo", "nome", "empresa", "uid"]);
        const idUserC = await Database.select("id")
            .table("funcionarios")
            .where("uid", dadosEnviados.uid);
        if (idUserC === null || idUserC === undefined || idUserC === []) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 37,
                    msg: "Funcionário não encontrado no sistema para criar setor",
                },
            };
        } else {
            const funcionarioEmpresa = await Database.select("*")
                .table("funcionario_empresas")
                .where("funcionario_uid", dadosEnviados.uid)
                .where("empresa", dadosEnviados.empresa);
            if (
                funcionarioEmpresa[0]?.cargo === "F" ||
                funcionarioEmpresa[0]?.cargo === undefined ||
                funcionarioEmpresa[0]?.cargo === null
            ) {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 38,
                        msg: "Funcionário sem permissão ou não vinculado a empresa para criar setor",
                    },
                };
            } else {
                retorno = await Setor.create({
                    ativo: dadosEnviados.ativo,
                    nome: dadosEnviados.nome,
                    empresa: dadosEnviados.empresa,
                    userc: idUserC[0].id,
                });

                const nomeUser = await Database.select("nome")
                .table("funcionarios")
                .where("id", retorno.userc)
                retorno.userc = {
                    id: retorno.userc,
                    nome:nomeUser[0].nome
                }
            }
        }
        // Database.close(['pg'])
        return retorno;
    }

    //Esta funcao é usada no controller da empresa para criar um setor assim que a empresa é criada
    //Retorna a ID do setor para poder vincular no FuncionarioEmpresa
    async criarSetorEmpresa({ request, response }) {
        let retorno = "";
        const idUserC = await Database.select("id")
            .table("funcionarios")
            .where("uid", request.uid);
        if (idUserC === null) {
            response?.(404);
            retorno = {
                erro: {
                    codigo: 36,
                    msg: "Funcionário não encontrado no sistema",
                },
            };
        } else {
            retorno = await Setor.create({
                ativo: request.ativo,
                nome: request.nome,
                empresa: request.empresa,
                userc: idUserC[0].id,
            });
        }
        // Database.close(['pg'])
        return retorno.id;
    }

    async listarSetores({ request, params, response }) {
        //exemplo de url
        //http://127.0.0.1:3333/setor/1
        let retorno = "";
        const user = request.only(["uid"]);
        if (user.uid === "" || user.uid === undefined || user.uid === null) {
            response?.status(400);
            retorno = {
                erro: {
                    codigo: 30,
                    msg: "Não informado uid para buscar setores vinculadas a empresa",
                },
            };
        } else {
            //verifica se o funcionario esta vinculado a empresa
            const verificaVinculo = await Database.select("*")
                .table("funcionario_empresas")
                .where("empresa", params.empresa)
                .where("funcionario_uid", user.uid);
            if (
                verificaVinculo[0]?.empresa === undefined ||
                verificaVinculo[0]?.empresa === null
            ) {
                response?.status(404);
                retorno = {
                    erro: {
                        codigo: 39,
                        msg: "Funcionario não vinculado a empresa",
                    },
                };
            } else {
                retorno = await Database.select("setors.*","funcionarios.nome as nomeUserc")
                    .table("setors")
                    .innerJoin('funcionarios','funcionarios.id','setors.userc')
                    .where("empresa", params.empresa)
                
                // const nomeUser = await Database.select("nome")
                // .table("funcionarios")
                // .where("id", retorno.userc)
                // retorno.userc = {
                //     id: retorno.userc,
                //     nome:nomeUser[0].nome
                // }
            }
        }
        // Database.close(['pg'])
        return retorno;
    }

    async dadosSetor({ params }) {
        return await Setor.findOrFail(params.id);
    }

    async alterarSetor({ params, request, response }) {
        //exemplo de url
        //http://127.0.0.1:3333/setor/1
        let retorno = "";
        const setor = await Setor.find(params.id);
        if (setor === null || setor === undefined || setor === "") {
            response?.status(404);
            retorno = { erro: { codigo: 31, msg: "Setor não encontrado" } };
        } else {
            if (setor.empresa === null) {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 43,
                        msg: "Setor " + setor.nome + " não pode ser alterado",
                    },
                };
            } else {
                const dadosEnviados = request.only([
                    "ativo",
                    "nome",
                    "uid",
                    "empresa",
                ]);
                //busca no banco de dados as informacoes de vinculo do funcionario com a empresa para poder verificar se o funcionario tem permissao para alterar a empresa
                const funcionario_empresas = await Database.select("*")
                    .table("funcionario_empresas")
                    .where("funcionario_uid", dadosEnviados.uid)
                    .where("empresa", dadosEnviados.empresa);
                if (
                    funcionario_empresas[0]?.empresa === undefined ||
                    funcionario_empresas[0]?.empresa === null
                ) {
                    response?.status(404);
                    retorno = {
                        erro: {
                            codigo: 32,
                            msg: "Funcionario não vinculado a empresa para alterar setor",
                        },
                    };
                } else {
                    if (funcionario_empresas[0]?.cargo === "F") {
                        response?.status(403);
                        retorno = {
                            erro: {
                                codigo: 40,
                                msg: "Funcionario sem permissão para alterar setor",
                            },
                        };
                    } else {
                        const novosDados = {
                            ativo: dadosEnviados.ativo,
                            nome: dadosEnviados.nome,
                            userm: funcionario_empresas[0].funcionario,
                        };
                        await logC.novoLog({
                            request: {
                                operacao: "ALTERAR",
                                tabela: "SETOR",
                                coluna: "",
                                valorantigo: JSON.stringify(setor),
                                valornovo: JSON.stringify(novosDados),
                                funcionario:
                                    funcionario_empresas[0].funcionario,
                                empresa: funcionario_empresas[0].empresa,
                            },
                        });
                        setor.merge(novosDados);
                        await setor.save();
                        retorno = setor;
                    }
                }
            }
        }
        // Database.close(['pg'])
        return retorno;
    }

    async deletarSetor({ params, request, response }) {
        let retorno = "";
        if (params.id == 1) {
            response?.status(401);
            retorno = {
                erro: {
                    codigo: 45,
                    msg: "Setor Geral não pode ser excluido ou alterado",
                },
            };
        } else {
            if (
                params.id === undefined ||
                params.id === null ||
                params.id === ""
            ) {
                response?.status(400);
                retorno = {
                    erro: {
                        codigo: 41,
                        msg: "Parametros informados inválidos ou não informados",
                    },
                };
            } else {
                const setor = await Setor.find(params.id);
                if (setor === null || setor === undefined || setor === "") {
                    response?.status(404);
                    retorno = {
                        erro: { codigo: 44, msg: "Setor não encontrado" },
                    };
                } else {
                    const dadosEnviados = request.only(["uid"]);
                    const funcionario_empresas = await Database.select("*")
                        .table("funcionario_empresas")
                        .where("funcionario_uid", dadosEnviados.uid)
                        .where("empresa", setor.empresa);
                    if (
                        funcionario_empresas[0]?.empresa === undefined ||
                        funcionario_empresas[0]?.empresa === null
                    ) {
                        response?.status(404);
                        retorno = {
                            erro: {
                                codigo: 42,
                                msg: "Funcionario não vinculado a empresa para excluir setor",
                            },
                        };
                    } else {
                        if (funcionario_empresas[0]?.cargo === "F") {
                            response?.status(403);
                            retorno = {
                                erro: {
                                    codigo: 40,
                                    msg: "Funcionario sem permissão para excluir setor",
                                },
                            };
                        } else {
                            await Database.table("funcionario_empresas")
                                .where("setor", setor.id)
                                .update("setor", "1");
                            retorno = setor;
                            await setor.delete();
                        }
                    }
                }
            }
            //Fecha a conexão aqui pois primeiro precisa requisitar algo no banco de dados para poder usar o // Database.close
            //caso coloque fora desse if o servidor retorna um erro informando que close não é uma função de Database;
            // Database.close(['pg'])
        }
        return retorno;
        // const setor = await Setor.findOrFail(params.id)
        // await setor.delete();
        // return{mensagem: 'Setor deletado'}
    }
}

module.exports = SetorController;
