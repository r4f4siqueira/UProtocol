"use strict";
const Protocolo = use("App/Models/Protocolo");
const Database = use("Database");

const LogController = require("./LogController");
const logC = new LogController();

class ProtocoloController {
    async criarProtocolo({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only([
            "cliente",
            "prioridade",
            "pessoaatendida",
            "motivo",
            "previsao",
            "setor",
            "uid",
            "empresa",
        ]);

        //1 - Verifica se o usario que solicitou a requisição existe
        //2 - verifica se o atendente esta preenchido
        //3 - verifica se o cliente esta preenchido e se é um cliente valido
        //4 - verifica se a empresa esta prenchida
        //se todas as validacoes passar cadastra o protocolo
        //Caso contrario retorna erro com suas respectivas informacoes de erro

        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (userc.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 10,
                    msg: "Usuario não encontrado ou não vinculado a empresa para cadastrar protocolo",
                },
            };
        } else {
            if (
                dadosRequest.cliente === null ||
                dadosRequest.cliente === undefined
            ) {
                response?.status(400);
                retorno = {
                    erro: {
                        codigo: 12,
                        msg: "Cliente não preenchido para cadastrar protocolo",
                    },
                };
            } else {
                if (
                    dadosRequest.empresa === null ||
                    dadosRequest.empresa === undefined
                ) {
                    response?.status(400);
                    retorno = {
                        erro: {
                            codigo: 13,
                            msg: "Empresa não preenchida para cadastrar protocolo",
                        },
                    };
                } else {
                    const idCliente = await Database.select("id")
                        .table("clientes")
                        .where("id", dadosRequest.cliente)
                        .where("empresa", dadosRequest.empresa);

                    if (idCliente.length === 0) {
                        response?.status(404);
                        retorno = {
                            erro: { codigo: 95, msg: "Cliente não encontrado" },
                        };
                    } else {
                        retorno = await Protocolo.create({
                            atendente: userc[0].funcionario,
                            cliente: idCliente[0].id,
                            prioridade: dadosRequest.prioridade,
                            pessoaatendida: dadosRequest.pessoaatendida,
                            motivo: dadosRequest.motivo,
                            previsao: dadosRequest.previsao,
                            userc: userc[0].funcionario,
                            empresa: dadosRequest.empresa,
                            situacao: "A",
                            setor: userc[0].setor,
                        });
                        //await Protocolo.create(dadosRequest);
                    }
                }
            }
        }
        return retorno;
    }

    async listarProtocolos({ request, response }) {
        let retorno = "";
        //console.log(request.input('dia')); novo metodo descoberto, funciona muito bem
        const dadosRequest =
            request.uid !== "teste"
                ? request.only(["uid", "empresa"])
                : request;
        const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (user.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 96,
                    msg: "Funcionario não vinculado a empresa para listar protocolos",
                },
            };
        } else {
            retorno = await Database.select(
                "protocolos.*",
                "fc.nome as userc_nome",
                "fa.nome as atendente_nome",
                "prioridades.ordemimportancia",
                "prioridades.nome",
                "clientes.fantasia",
                "setors.nome as setor_nome"
            )
                .table("protocolos")
                .where("protocolos.empresa", dadosRequest.empresa)
                .innerJoin("funcionarios as fc", "fc.id", "protocolos.userc")
                .innerJoin("clientes", "clientes.id", "protocolos.cliente")
                .innerJoin("setors", "setors.id", "protocolos.setor")
                .leftJoin("funcionarios as fa", "fa.id", "protocolos.atendente")
                .leftJoin(
                    "prioridades",
                    "prioridades.id",
                    "protocolos.prioridade"
                )
                .orderBy("ordemimportancia")
                .orderBy("previsao");
            //.forPage(1, 5) // caso precise usar paginação
            //variavel para pegar a data e hora atual e comparar se o protocolo esta atrasado
            const agora = new Date();
            retorno.every((lista) => {
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome,
                };
                lista.prioridade = {
                    id: lista.prioridade,
                    ordem: lista.ordemimportancia,
                    nome: lista.nome,
                };
                lista.atendente = {
                    id: lista.atendente,
                    nome: lista.atendente_nome,
                };
                lista.cliente = {
                    id: lista.cliente,
                    nome: lista.fantasia,
                };
                lista.setor = {
                    id: lista.setor,
                    nome: lista.setor_nome,
                };
                lista.fantasia = undefined;
                lista.userc_nome = undefined;
                lista.atendente_nome = undefined;
                lista.nome = undefined;
                lista.setor_nome = undefined;
                lista.ordemimportancia = undefined;
                if (lista.previsao !== null && lista.situacao !== "C") {
                    lista.atrasado = agora < lista.previsao ? false : true; //verificando se o protocolo está atrasado
                } else {
                    lista.atrasado = false;
                }
                //verificando se o protocolo está atrasado

                return true;
            });
        }
        return retorno;
    }

    async dadosProtocolo({ params, request, response }) {
        let retorno = "";
        //Verifica se o parametro passado pela URL é valido
        if (
            params.id === null ||
            params.id === "" ||
            parseInt(params.id) === undefined
        ) {
            response?.status(400);
            retorno = {
                erro: {
                    codigo: 14,
                    msg:
                        "Parametros invalidos para consultar protocolo, parametro passado:" +
                        params.id,
                },
            };
        } else {
            const dadosRequest = request.only(["uid", "empresa"]);
            const user = await Database.table("funcionario_empresas")
                .where("funcionario_uid", dadosRequest.uid)
                .where("empresa", dadosRequest.empresa)
                .whereNotNull("setor");

            if (user.length === 0) {
                response?.status(404);
                retorno = {
                    erro: {
                        codigo: 97,
                        msg: "funcionario não vinculado a empresa para ver os dados do protocolo",
                    },
                };
            } else {
                //Pega os dados do protocolo encontrado e atribui para dados
                const dados = await Protocolo.find(params.id);
                //verifica se encontrou algum protocolo
                //se nao encontrou retorna erro
                //se encontrar a empresa retorna os dados do protocolo encotrado
                if (dados === null) {
                    response?.status(404);
                    retorno = {
                        erro: {
                            codigo: 15,
                            msg:
                                "Protocolo com ID:" +
                                params.id +
                                " nao encontrado",
                        },
                    };
                } else {
                    let protocolo = await Database.select(
                        "protocolos.*",
                        "fc.nome as userc_nome",
                        "fa.nome as atendente_nome",
                        "prioridades.ordemimportancia",
                        "prioridades.nome",
                        "clientes.fantasia",
                        "setors.nome as setor_nome"
                    )
                        .table("protocolos")
                        .where("protocolos.empresa", dadosRequest.empresa)
                        .where("protocolos.id", dados.id)
                        .innerJoin(
                            "funcionarios as fc",
                            "fc.id",
                            "protocolos.userc"
                        )
                        .innerJoin(
                            "clientes",
                            "clientes.id",
                            "protocolos.cliente"
                        )
                        .innerJoin("setors", "setors.id", "protocolos.setor")
                        .leftJoin(
                            "funcionarios as fa",
                            "fa.id",
                            "protocolos.atendente"
                        )
                        .leftJoin(
                            "prioridades",
                            "prioridades.id",
                            "protocolos.prioridade"
                        )
                        .orderBy("ordemimportancia")
                        .orderBy("previsao");
                    //.forPage(1, 5) caso precise usar paginação

                    let observacoes = await Database.select(
                        "observacoes.*",
                        "funcionarios.nome as atendente_nome",
                        "funcionarios.avatarURL as atendente_avatar"
                    )
                        .table("observacoes")
                        .innerJoin(
                            "funcionarios",
                            "funcionarios.id",
                            "observacoes.atendente"
                        )
                        .where("observacoes.protocolo", dados.id)
                        .orderBy("id");

                    observacoes.every((lista) => {
                        lista.atendente = {
                            id: lista.atendente,
                            nome: lista.atendente_nome,
                            avatar: lista.atendente_avatar,
                        };
                        lista.atendente_nome = undefined;
                        lista.atendente_avatar = undefined;

                        return true;
                    });

                    //variavel para pegar a data e hora atual e comparar se o protocolo esta atrasado
                    const agora = new Date();
                    protocolo.every((lista) => {
                        lista.userc = {
                            id: lista.userc,
                            nome: lista.userc_nome,
                        };
                        lista.prioridade = {
                            id: lista.prioridade,
                            ordem: lista.ordemimportancia,
                            nome: lista.nome,
                        };
                        lista.atendente = {
                            id: lista.atendente,
                            nome: lista.atendente_nome,
                        };
                        lista.cliente = {
                            id: lista.cliente,
                            nome: lista.fantasia,
                        };
                        lista.setor = {
                            id: lista.setor,
                            nome: lista.setor_nome,
                        };
                        lista.fantasia = undefined;
                        lista.userc_nome = undefined;
                        lista.atendente_nome = undefined;
                        lista.nome = undefined;
                        lista.setor_nome = undefined;
                        lista.ordemimportancia = undefined;
                        if (lista.previsao !== null) {
                            lista.atrasado =
                                agora < lista.previsao ? false : true; //verificando se o protocolo está atrasado
                        } else {
                            lista.atrasado = false;
                        }
                        lista.observacoes = observacoes;

                        return true;
                    });

                    retorno = protocolo;
                }
            }
        }
        return retorno;
        //return await Protocolo.find(params.id)
    }

    async alterarProtocolo({ params, request, response }) {
        let retorno = "";
        const protocolo = await Protocolo.find(params.id);

        if (!protocolo) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 98,
                    msg: "Protocolo não encontrado para ser alterado",
                },
            };
        } else {
            if (protocolo.situacao === "C" || protocolo.situacao === "c") {
                response?.status(403);
                return {
                    erro: { codigo: 16, msg: "Protocolo já está concluido" },
                };
            } else {
                const dadosRequest = request.only([
                    "cliente",
                    "prioridade",
                    "pessoaatendida",
                    "motivo",
                    "previsao",
                    "setor",
                    "uid",
                    "empresa",
                ]);

                const userm = await Database.select("*")
                    .table("funcionario_empresas")
                    .where("funcionario_uid", dadosRequest.uid)
                    .where("empresa", protocolo.empresa)
                    .whereNotNull("setor");

                if (userm.length === 0) {
                    response?.status(404);
                    retorno = {
                        erro: {
                            codigo: 99,
                            msg: "Funcionario não vinculado a empresa para alterar Protocolo",
                        },
                    };
                } else {
                    await logC.novoLog({
                        request: {
                            operacao: "ALTERAR",
                            tabela: "protocolos",
                            coluna: "",
                            valorantigo: JSON.stringify(protocolo),
                            valornovo: JSON.stringify({
                                cliente: dadosRequest.cliente,
                                prioridade: dadosRequest.prioridade,
                                pessoaatendida: dadosRequest.pessoaatendida,
                                motivo: dadosRequest.motivo,
                                previsao: dadosRequest.previsao,
                                situacao: dadosRequest.situacao,
                                setor: dadosRequest.setor,
                            }),
                            funcionario: userm[0].funcionario,
                            empresa: dadosRequest.empresa,
                        },
                    });

                    protocolo.merge({
                        cliente: dadosRequest.cliente,
                        prioridade: dadosRequest.prioridade,
                        pessoaatendida: dadosRequest.pessoaatendida,
                        motivo: dadosRequest.motivo,
                        previsao: dadosRequest.previsao,
                        situacao: dadosRequest.situacao,
                        setor: dadosRequest.setor,
                        userm: userm[0].funcionario,
                    });

                    await protocolo.save();
                    retorno = protocolo;
                }
            }
        }
        return retorno;
    }

    async concluirProtocolo({ params, request, response }) {
        let retorno = "";
        const protocolo = await Protocolo.findOrFail(params.id);
        const dadosRequest = request.only(["uid", "empresa"]);

        const userc = await Database.select(
            "funcionario_empresas.*",
            "funcionarios.nome as nome_funcionario"
        )
            .table("funcionario_empresas")
            .innerJoin(
                "funcionarios",
                "funcionarios.id",
                "funcionario_empresas.funcionario"
            )
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", protocolo.empresa)
            .whereNotNull("setor");

        if (userc.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 102,
                    msg: "Funcionario não vinculado a empresa para Concluir Protocolo",
                },
            };
        } else {
            //verificar atendente e repassar para quem ta concluindo
            //observar conclusão
            //
            if (protocolo.situacao == "C") {
                response?.status(403);
                retorno = {
                    erro: {
                        codigo: 103,
                        msg: "Protocolo já concluido",
                    },
                };
            } else {
                if (protocolo.atendente === userc[0].funcionario) {
                    protocolo.merge({ situacao: "C" });
                    await Database.table("observacoes").insert({
                        protocolo: protocolo.id,
                        atendente: userc[0].funcionario,
                        observacao:
                            userc[0].nome_funcionario +
                            " encerrou este protocolo",
                        empresa: userc[0].empresa,
                    });
                    await protocolo.save();
                    retorno = protocolo;
                } else {
                    await Database.table("repasses").insert({
                        funcionarioatual: protocolo.atendente,
                        protocolo: protocolo.id,
                        funcionariodestino: userc[0].funcionario,
                        userc: userc[0].funcionario,
                        empresa: userc[0].empresa,
                        setor: userc[0].setor,
                    });

                    await Database.table("observacoes").insert({
                        protocolo: protocolo.id,
                        atendente: userc[0].funcionario,
                        observacao:
                            userc[0].nome_funcionario +
                            " encerrou este protocolo",
                        empresa: userc[0].empresa,
                    });

                    await protocolo.merge({
                        situacao: "C",
                        atendente: userc[0].funcionario,
                    });
                    await protocolo.save();

                    retorno = protocolo;
                }
            }
        }

        return retorno;
    }

    async protocolosSearch({ request, response }) {
        let retorno = "";
        
        const dadosRequest =
            request.uid !== "teste"
                ? request.all()
                : request;
        const user = await Database.table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (user.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 96,
                    msg: "Funcionario não vinculado a empresa para listar protocolos",
                },
            };
        } else {

            retorno = await Database.select(
                "protocolos.*",
                "fc.nome as userc_nome",
                "fa.nome as atendente_nome",
                "prioridades.ordemimportancia",
                "prioridades.nome",
                "clientes.fantasia",
                "setors.nome as setor_nome"
            )
                .table("protocolos")
                .innerJoin("funcionarios as fc", "fc.id", "protocolos.userc")
                .innerJoin("clientes", "clientes.id", "protocolos.cliente")
                .innerJoin("setors", "setors.id", "protocolos.setor")
                .leftJoin("funcionarios as fa", "fa.id", "protocolos.atendente")
                .leftJoin("prioridades","prioridades.id","protocolos.prioridade")
                .where("protocolos.empresa", dadosRequest.empresa)
                .andWhere("protocolos.created_at", '>=', dadosRequest.datainicial==null? '01/01/0001' : dadosRequest.datainicial)
                .andWhere("protocolos.created_at", '<=', dadosRequest.datafinal==null? '31/12/99999' : dadosRequest.datafinal)
                .andWhere("protocolos.setor", dadosRequest.setor===''? '<>' : '=', dadosRequest.setor===''? 0 : dadosRequest.setor)
                .orderBy("ordemimportancia")
                .orderBy("previsao");
                //.forPage(1, 5) // caso precise usar paginação
            //variavel para pegar a data e hora atual e comparar se o protocolo esta atrasado
            const agora = new Date();
            retorno.every((lista) => {
                lista.userc = {
                    id: lista.userc,
                    nome: lista.userc_nome,
                };
                lista.prioridade = {
                    id: lista.prioridade,
                    ordem: lista.ordemimportancia,
                    nome: lista.nome,
                };
                lista.atendente = {
                    id: lista.atendente,
                    nome: lista.atendente_nome,
                };
                lista.cliente = {
                    id: lista.cliente,
                    nome: lista.fantasia,
                };
                lista.setor = {
                    id: lista.setor,
                    nome: lista.setor_nome,
                };
                lista.fantasia = undefined;
                lista.userc_nome = undefined;
                lista.atendente_nome = undefined;
                lista.nome = undefined;
                lista.setor_nome = undefined;
                lista.ordemimportancia = undefined;
                if (lista.previsao !== null && lista.situacao !== "C") {
                    lista.atrasado = agora < lista.previsao ? false : true; //verificando se o protocolo está atrasado
                } else {
                    lista.atrasado = false;
                }
                //verificando se o protocolo está atrasado

                return true;
            });
        }
        return retorno;
    }

    async deletarProtocolo({ params }) {
        const protocolo = await Protocolo.findOrFail(params.id);
        await protocolo.delete();
        return { mensagem: "Protocolo deletado" };
    }

    /*
     * Fazer estas duas funcoes e suas respectivas rotas!
     *
     * async repassarProtocolo({params}){}
     *
     * async concluirProtocolo({params}){]
     *
     *
     */
}

module.exports = ProtocoloController;
