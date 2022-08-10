//Empresa.js
module.exports = class Contato {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.ativo = 0;
        this.cliente = 0;
        this.telefone = "";
        this.email = "";
        this.pessoa = "";
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
        //Inserir dados
    }

    alterarDados(){
        //alterar dados
    }

    //get
    get id(){return this.id;}
    get ativo(){return this.ativo;}
    get cliente(){return this.cliente;}
    get telefone(){return this.telefone}
    get email(){return this.email;}
    get pessoa(){return this.pessoa;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get dataM(){return this.dataM;}
    get userM(){return this.userM;}
    get empresa(){return this.empresa;}

    //set
    set id(id){this.id = id;}
    set ativo(ativo){this.ativo = ativo}
    set cliente(cliente){this.cliente = cliente;}
    set telefone(telefone){this.telefone = telefone;}
    set email(email){this.email = email;}
    set pessoa(pessoa){this.pessoa = pessoa;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}
}