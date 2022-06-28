'use strict'

class UsuarioEmpresaController {
    async criarUsuarioEmpresa({request}){
        const dataToCreate = request.only(['empresa','usuario'])
        return await UsuarioEmpresa.create(dataToCreate);
    }

    async listarUsuarioEmpresas(){
        return await UsuarioEmpresa.all();
    }

    async dadosUsuarioEmpresa({params}){
        return await UsuarioEmpresa.findOrFail(params.id)
    }

    async alterarUsuarioEmpresa({params, request}){
        const usuarioEmpresa = await UsuarioEmpresa.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaUsuarioEmpresa = request.only(['empresa','usuario'])

        usuarioEmpresa.merge(atualizaUsuarioEmpresa);

        await usuarioEmpresa.save();
        return usuarioEmpresa
    }

    async deletarUsuarioEmpresa({params}){
        const usuarioEmpresa = await UsuarioEmpresa.findOrFail(params.id)
        await usuarioEmpresa.delete();
        return{mensagem: 'Usuario relacionado a Empresa deletado'}
    }
}

module.exports = UsuarioEmpresaController
