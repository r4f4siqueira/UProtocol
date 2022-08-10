//Empresa.js
module.exports = class UsuarioEmpresa {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.empresa = 0;
        this.usuario = 0;
    }

    //Metodos da classe
    removerDados(){
        //remover dados
    }

    inserirDados(){
        //inserir dados
    }

    alterarDados(){
        //alterar dados
    }


    //get
    get id(){return this.id;}
    get empresa(){return this.empresa;}
    get usuario(){return this.usuario;}

    //set
    set id(id){this.id = id;}
    set empresa(empresa){this.empresa = empresa}
    set usuario(usuario){this.usuario = usuario;}

}