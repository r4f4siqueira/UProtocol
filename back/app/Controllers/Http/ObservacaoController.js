"use strict";

const Observacao = use("App/Models/Observacao");
const Database = use("Database");
class ObservacaoController {
    async criarObservacao({ request, response }) {
        let retorno = "";
        const dadosRequest = request.only([
            "protocolo",
            "observacao",
            "uid",
            "empresa",
        ]);
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dadosRequest.uid)
            .where("empresa", dadosRequest.empresa)
            .whereNotNull("setor");

        if (userc.length === 0) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 105,
                    msg: "Usuário não encontrado ou não vinculado a empresa para observar protocolo",
                },
            };
        } else {
            const protocolo = await Database.select("*")
                .table("protocolos")
                .where("id", dadosRequest.protocolo);

            if (protocolo.length === 0) {
                response?.status(404);
                retorno = {
                    erro: {
                        codigo: 106,
                        msg: "Protocolo não encontrado para ser observado",
                    },
                };
            } else {
                if (
                    protocolo[0].situacao === "C" ||
                    protocolo[0].situacao === "c"
                ) {
                    response?.status(403);
                    retorno = {
                        erro: { codigo: 107, msg: "Protocolo já concluido" },
                    };
                } else {
                    const agora = new Date();
                    retorno = await Observacao.create({
                        protocolo: protocolo[0].id,
                        atendente: userc[0].funcionario,
                        observacao: dadosRequest.observacao,
                        empresa: userc[0].empresa,
                        created_at: agora.toLocaleString(),
                    });
                }
            }
        }

        //return await Observacao.create(dataToCreate);
        return retorno;
    }

    async listarObservacoes() {
        return await Observacao.all();
    }

    async dadosObservacao({ params }) {
        return await Observacao.findOrFail(params.id);
    }

    async alterarObservacao({ params, request }) {
        const observacao = await Observacao.findOrFail(params.id); //Retorna erro caso nao encontrar
        const atualizaObservacao = request.only([]); //observacao nao altera, mas dx aqui vai que

        observacao.merge(atualizaObservacao);

        await observacao.save();
        return observacao;
    }

    async deletarObservacao({ params }) {
        const observacao = await Observacao.findOrFail(params.id);
        await observacao.delete();
        return { mensagem: "Observacao deletada" }; //observacao nao deleta mas dx aki para testes de rota DEPOIS TIRA PELO AMOR DE DEUS
    }
}

module.exports = ObservacaoController;
