//Empresa.js
module.exports = class Log {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.operacao = "";
        this.tabela = "";
        this.coluna = "";
        this.valorAntigo = "";
        this.valorNovo = ""
        this.dataM = new Date();
        this.userM = "";
        this.empresa = 0;
    }

    //Metodos da classe
    inserirDados(){
        //Inserir dados
    }

    //get
    get id(){return this.id;}
    get operacao(){return this.operacao;}
    get tabela(){return this.tabela;}
    get coluna(){return this.coluna}
    get valorAntigo(){return this.valorAntigo;}
    get valorNovo(){return this.valorNovo;}
    get dataM(){return this.dataM;}
    get userM(){return this.userM;}
    get empresa(){return this.empresa;}

    //set
    set id(id){this.id = id;}
    set operacao(operacao){this.operacao = operacao}
    set tabela(tabela){this.tabela = tabela;}
    set coluna(coluna){this.coluna = coluna;}
    set valorAntigo(valorAntigo){this.valorAntigo = valorAntigo;}
    set valorNovo(valorNovo){this.valorNovo = valorNovo;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}
}