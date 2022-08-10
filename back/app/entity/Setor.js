//Empresa.js
module.exports = class Setor {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.ativo = 0;
        this.nome = "";
        this.dataC = new Date();
        this.userC = "";
        this.dataM = new Date();
        this.userM = "";
        this.empresa = 0;
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
    get nome(){return this.nome;}
    get dataC(){return this.dataC}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set ativo(ativo){this.ativo = ativo}
    set nome(nome){this.nome = nome;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}