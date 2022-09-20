'use strict'

const Database = use('Database')
const FuncionarioEmpresa = use("App/Models/FuncionarioEmpresa")

class FuncionarioEmpresaController {
    async criarFuncionarioEmpresa({request, response}){
        let retorno =''
        const dados = request.only(["uid","email","empresa","cargo"])
        const userc = await Database.select("*")
            .table("funcionario_empresas")
            .where("funcionario_uid", dados.uid)
            .where("empresa",dados.empresa);
        if (userc[0] === null || userc[0] === undefined || userc[0] === []) {
            response?.status(404);
            retorno = {
                erro: {
                    codigo: 46,
                    msg: "Funcionário não encontrado no sistema para Convidar funcionário",
                },
            };
        } else{
            if(userc[0].cargo==='F'){
                response?.status(403)
                retorno = {erro:{codigo: 47, msg: "Funcionario sem permissão para convidar funcionario"}}
            }else{
                const funcionario = await Database.select('*')
                    .table('funcionarios')
                    .where('email',dados.email)
                if(funcionario[0]===null||funcionario[0]===undefined){
                    response?.status(404)
                    retorno = {erro:{codigo:48,msg:"Funcionário Não Encontrado"}}
                }else{
                    const funcionario_empresa = await Database.select('*')
                        .table('funcionario_empresas')
                        .where('empresa',dados.empresa)
                        .where('funcionario',funcionario[0].id)
                    if(funcionario_empresa[0]?.id){
                        response?.status(403)
                        retorno = {erro:{codigo:49,msg:"Funcionário já vinculado a empresa ou pendente de resposta"}}
                    }else{
                        retorno = await FuncionarioEmpresa.create({
                            empresa: dados.empresa,
                            funcionario: funcionario[0].id,
                            funcionario_uid: funcionario[0].uid,
                            cargo: dados.cargo,
                            userc: userc[0].id
                        });
                    }
                }
            }
        }
        return retorno
    }

    //Funcao para ser usada por dentro dos controllers
    async vinculaFuncionarioEmpresa({request}){
        //passar a request como um objeto ex:
        //{request:{empresa:1,funcionario:1,setor:1,cargo:'A'}}
        await FuncionarioEmpresa.create(request);
    }

    async listarFuncionarioEmpresas({request, response}){
        let retorno = ''
        const dados = request.only(['uid','empresa'])
        const verificador = await Database.select("empresa")
            .table("funcionario_empresas")
            .where("funcionario_uid", dados.uid)
            .where("empresa",dados.empresa);
        if(verificador[0]?.empresa===undefined){
            response?.status(404)
            retorno = {erro:{codigo:50,msg:"Funcionário Não vinculado a empresa para listar os funcionários"}}
        }else{
            retorno = await Database.select(
                'funcionario_empresas.*',
                'funcionarios.nome',
                'funcionarios.email')
            .table("funcionario_empresas")
            .innerJoin('funcionarios','funcionario_empresas.funcionario','funcionarios.id')
            .where("empresa",dados.empresa)
            .whereNotNull('setor');
        }
        return retorno
        //return await FuncionarioEmpresa.all();
    }

    async dadosFuncionarioEmpresa({params}){
        return await FuncionarioEmpresa.findOrFail(params.id)
    }

    async verificaVinculo(uid,empresa){
        const result = await Database.table('funcionario_empresas').where('funcionario_uid',uid).where('empresa',empresa)
        return result.length !== 0
    }

    async alterarFuncionarioEmpresa({request,response}){
        let retorno = ''
        const dadosRequest = request.only(['uid','empresa','funcionario','setor','cargo'])
        const userm = await Database.select('*').table('funcionario_empresas').where('funcionario_uid',dadosRequest.uid).where('empresa',dadosRequest.empresa)
        if(userm[0]?.cargo===undefined){
            response?.status(404)
            retorno = {erro:{codigo:51,msg:"Funcionário Não vinculado a empresa para alterar funcionários"}}
        }else{
            if(userm[0]?.cargo==='F'){
                response?.status(403)
                retorno = {erro:{codigo:52,msg:"Funcionário sem permissão para alterar funcionários"}}
            }else{
                
                // const funcionario = await Database.select('*')
                // .table('funcionario_empresas')
                // .where('funcionario',dadosRequest.funcionario)
                // .where('empresa',dadosRequest.empresa)
                //merge não é a melhor função para realizar esta operação(minha opinião)
                funcionario.merge({
                    id: funcionario.id,
                    empresa: funcionario.id,
                    funcionario: funcionario.funcionario,
                    funcionario_uid: funcionario.funcionario_uid,
                    setor: dadosRequest.setor,
                    cargo: dadosRequest.cargo,
                    userc: funcionario.userc,
                    userm: userm.funcionario
                })
            }
        }
        
        
        // const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id);//Retorna erro caso nao encontrar
        // 

        // funcionarioEmpresa.merge(atualizaFuncionarioEmpresa);

        // await funcionarioEmpresa.save();
        // return funcionarioEmpresa
        return retorno

    }

    async deletarFuncionarioEmpresa({params}){
        const funcionarioEmpresa = await FuncionarioEmpresa.findOrFail(params.id)
        await funcionarioEmpresa.delete();
        return{mensagem: 'Funcionario relacionado a Empresa deletado'}
    }
}

module.exports = FuncionarioEmpresaController
