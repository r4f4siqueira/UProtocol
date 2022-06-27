'use strict'
const Empresa = use('App/Models/Empresa')

class EmpresaController {
    async store({request}){
        const dataToCreate = request.only(['ativo','CNPJ_CPF','razaosocial','fantasia','criador', 'userc'])
        return await Empresa.create(dataToCreate);
    }
}

module.exports = EmpresaController
