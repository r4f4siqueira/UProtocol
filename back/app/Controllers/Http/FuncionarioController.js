"use strict";

const Database = use("Database");
const Funcionario = use("App/Models/Funcionario");

class FuncionarioController {
    async criarFuncionario({ request, response }) {
        //Pega os dados enviados pela requisicao e atribui a dataToCreate
        const dataToCreate = request.only([
            "ativo",
            "nome",
            "email",
            "uid",
            "avatarURL",
        ]);
        //Verifica se esta passando user UID
        //Se tiver UID velifica se esta passando nome
        //Se passar nome verifica o Email
        //Se tudo estiver ok cadastra o funcionario
        if (
            dataToCreate.uid === "" ||
            dataToCreate.uid === null ||
            dataToCreate.uid === undefined
        ) {
            response?.status(400);
            // Database.close(['pg'])
            return {
                erro: {
                    codigo: 18,
                    msg: "UID inválida para criar funcionario",
                },
            };
        } else {
            if (
                dataToCreate.nome === "" ||
                dataToCreate.nome === null ||
                dataToCreate.uid === undefined
            ) {
                response?.status(400);
                // Database.close(['pg'])
                return {
                    erro: {
                        codigo: 19,
                        msg: "Nome invalido para criar funcionario",
                    },
                };
            } else {
                if (
                    dataToCreate.email === "" ||
                    dataToCreate.email === null ||
                    dataToCreate.email === undefined
                ) {
                    response?.status(400);
                    // Database.close(['pg'])
                    return {
                        erro: {
                            codigo: 20,
                            msg: "Email invalido para criar funcionario",
                        },
                    };
                } else {
                    const novoFuncionario = await Funcionario.create(
                        dataToCreate
                    );
                    // Database.close(['pg'])
                    return novoFuncionario;
                }
            }
        }
    }

    //async listarFuncionarios(){
    async dadosFuncionario({ request, response }) {
        let retorno = null;
        const user = request.only(["uid"]);
        if (user.uid === "" || user.uid === undefined || user.uid === null) {
            response?.status(400);
            retorno = {
                erro: { codigo: 33, msg: "uid do usuário não informada" },
            };
        } else {
            retorno = await Database.select("*")
                .table("funcionarios")
                .where("uid", user.uid);
            if (retorno.length === 0) {
                response?.status(404);
                retorno = {
                    erro: { codigo: 34, msg: "Nenhum funcionário encontrado" },
                };
            }
        }
        // Database.close(['pg'])
        return retorno;
    }

    // async dadosFuncionario({params, response}){
    //     //Verifica se a id passada esta preenchida
    //     //Se estiver preenchida verifica se encontrou o funcionario
    //     //Se encontrar o funcionario retorna o funcionario encontrado
    //     if(params.id===null||params.id===''||params.id===undefined){
    //         response?.status(400)
    //         return {erro:{codigo:21,msg:'Parametro invalido para consultar funcionario'}}
    //     }else{
    //         const dados = await Funcionario.find(params.id)
    //         if(dados===null){
    //             response?.status(400)
    //             return {erro:{codigo:22,msg:'Funcionaro com ID:'+params.id+' nao encontrado'}}
    //         }else{
    //             return dados
    //         }
    //     }
    // }

    // async buscaPorUID({params,response}){
    //     return await Funcionario.find(params.uid)
    // }

    async alterarFuncionario({ params, request }) {
        //verificar se esta passando userm
        //se passar userm verifica

        const funcionario = await Funcionario.find(params.id); //Retorna erro caso nao encontrar
        const atualizaFuncionario = request.only([
            "ativo",
            "nome",
            "email",
            "avatarURL",
        ]);

        funcionario.merge(atualizaFuncionario);

        await funcionario.save();
        return funcionario;
    }

    async deletarFuncionario({ params }) {
        const funcionario = await Funcionario.findOrFail(params.id);
        await funcionario.delete();
        return { mensagem: "Funcionario deletado" };
    }
}

module.exports = FuncionarioController;
