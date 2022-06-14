//Empresa.js
module.exports = class Cliente {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.ativo = 0;
        this.cnpj_cpf = "";
        this.razaoSocial = "";
        this.fantasia = "";
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
    get cnpj_cpf(){return this.cnpj_cpf;}
    get razaoSocial(){return this.razaoSocial}
    get fantasia(){return this.fantasia;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get dataM(){return this.dataM;}
    get userM(){return this.userM;}
    get empresa(){return this.empresa;}

    //set
    set id(id){this.id = id;}
    set ativo(ativo){this.ativo = ativo}
    set cnpj_cpf(cnpj_cpf){this.cnpj_cpf = cnpj_cpf;}
    set razaoSocial(razaoSocial){this.razaoSocial = razaoSocial;}
    set fantasia(fantasia){this.fantasia = fantasia;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}
}