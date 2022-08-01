'use strict'

const Usuario = use("App/Models/Usuario");

class UsuarioController {
    async criarUsuario({request}){
        const dataToCreate = request.only(['ativo','nome','email','conta','setor', 'cargo'])
        return await Usuario.create(dataToCreate);
    }

    async listarUsuarios(){
        return await Usuario.all();
    }

    async dadosUsuario({params}){
        return await Usuario.findOrFail(params.id)
    }

    async alterarUsuario({params, request}){
        const usuario = await Usuario.findOrFail(params.id);//Retorna erro caso nao encontrar
        const atualizaUsuario = request.only(['ativo','nome','email','conta','setor', 'cargo'])

        usuario.merge(atualizaUsuario);

        await usuario.save();
        return usuario
    }

    async deletarUsuario({params}){
        const usuario = await Usuario.findOrFail(params.id)
        await usuario.delete();
        return{mensagem: 'Usuario deletado'}
    }
}

module.exports = UsuarioController
