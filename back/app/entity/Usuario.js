//Empresa.js
module.exports = class Usuario {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.ativo = 0;
        this.nome = "";
        this.email = "";
        this.conta = "";
        this.setor = 0;
        this.cargo = "";
        this.dataC = new Date();
        this.userC = "";
        this.userM = "";
        this.dataM = new Date();
        this.empresa = 0;
    }

    constructor(id, ativo, nome, email, conta, setor, cargo, dataC, userC, dataM, userM, empresa) {
        this.id = id;
        this.ativo = ativo;
        this.nome = nome;
        this.email = email;
        this.conta = conta;
        this.setor = setor;
        this.cargo = cargo;
        this.dataC = dataC;
        this.userC = userC
        this.userM = userM;
        this.dataM = dataM;
        this.empresa = empresa;
    }


    //get
    get id(){return this.id;}
    get ativo(){return this.ativo;}
    get nome(){return this.nome;}
    get email(){return this.email;}
    get conta(){return this.conta;}
    get setor(){return this.setor;}
    get cargo(){return this.cargo;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set ativo(ativo){this.ativo = ativo}
    set nome(nome){this.nome = nome;}
    set email(email){this.email = email;}
    set conta(conta){this.conta = conta;}
    set setor(setor){this.setor = setor;}
    set cargo(cargo){this.cargo = cargo;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}