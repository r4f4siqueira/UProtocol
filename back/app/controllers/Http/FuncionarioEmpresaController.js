'use strict'

const Database = use('Database')
const FuncionarioEmpresa = use("App/Models/FuncionarioEmpresa")

class FuncionarioEmpresaController {
    async criarFuncionarioEmpresa({request, response}){
        let retorno =''
        const dados = request.only(["uid","email","empresa"])
        const Userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dados.uid)
            .where("empresa",dados.empresa);
            if (Userc[0] === null || Userc[0] === undefined || Userc[0] === []) {
                response?.status(404);
                retorno = {
                    erro: {
                        codigo: 46,
                        msg: "Funcionário não encontrado no sistema para Convidar funcionário",
                    },
                };
            } else{
                if(Userc[0].cargo==='F'){
                    response?.status(401)
                    retorno = {erro:{codigo: 47, msg: "Funcionario sem permissão para convidar funcionario"}}
                }else{
                    const funcionario = await Database.select('*')
                        .table('funcionario')
                        .where('email',dados.email)
                }
            }

            return Userc[0].cargo

        //Parametros nescessários para funcionar
        //UID de quem ta querendo fazer o vinculo
        //EMAIL da pessoa que o Administrador deseja vincular
        //ID da empresa do administrador

        //Com o UID e o ID da empresa eu verifico a permissão do usuário
        //Com o email busco no banco o funcionario e realizo o vinculo
        
        //const dataToCreate = request.only(['empresa','funcionario'])
        //return await FuncionarioEmpresa.create(dataToCreate);
    }

    //Funcao para ser usada por dentro dos controllers
    async vinculaFuncionarioEmpresa({request}){
        //passar a request como um objeto ex:
        //{request:{empresa:1,funcionario:1,setor:1,cargo:'A'}}
        await FuncionarioEmpresa.create(request);
    }

    async listarFuncionarioEmpresas(){
        return await FuncionarioEmpresa.all();
    }

    async dadosFuncionarioEmpresa({params}){
        return await FuncionarioEmpresa.findOrFail(params.id)
    }

    async verificaVinculo(uid,empresa){
        const result = await Database.table('funcionario_empresas').where('funcionario_uid',uid).where('empresa',empresa)
        return result.length !== 0
    }

    async alterarFuncionarioEmpresa({params, request}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaFuncionarioEmpresa = request.only(['empresa','funcionario'])

        funcionarioEmpresa.merge(atualizaFuncionarioEmpresa);

        await funcionarioEmpresa.save();
        return funcionarioEmpresa
    }

    async deletarFuncionarioEmpresa({params}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id)
        await funcionarioEmpresa.delete();
        return{mensagem: 'Funcionario relacionado a Empresa deletado'}
    }
}

module.exports = FuncionarioEmpresaController
