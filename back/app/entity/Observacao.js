//Empresa.js
module.exports = class Observacao {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.protocolo = 0;
        this.atendente = 0;
        this.observacao = 0;
        this.dataC = new Date();
        this.userC = "";
        this.userM = "";
        this.dataM = new Date();
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
    get protocolo(){return this.protocolo;}
    get atendente(){return this.atendente;}
    get observacao(){return this.observacao;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set protocolo(protocolo){this.protocolo = protocolo}
    set atendente(atendente){this.atendente = atendente;}
    set observacao(observacao){this.observacao = observacao;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}