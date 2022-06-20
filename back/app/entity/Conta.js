//Empresa.js
module.exports = class Conta {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.ativo = 0;
        this.login = "";
        this.senha = "";
    }

    //Metodos da classe
    removerDados(){
        //remover dados
    }

    inserirDados(){
        //inserir dadodos
    }

    alterarDados(){
        //alterar dados
    }

    //get
    get id(){return this.id;}
    get ativo(){return this.ativo;}
    get login(){return this.login;}
    get senha(){return this.senha;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    
    //set
    set id(id){this.id = id;}
    set ativo(ativo){this.ativo = ativo}
    set login(login){this.login = login;}
    set senha(senha){this.senha = senha;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}

}