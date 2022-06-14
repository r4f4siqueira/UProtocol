//Empresa.js
module.exports = class Anexo {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.protocolo = 0;
        this.descricao = "";
        this.anexo = "";
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
    get descricao(){return this.descricao;}
    get anexo(){return this.anexo;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set protocolo(protocolo){this.protocolo = protocolo}
    set descricao(descricao){this.descricao = descricao;}
    set anexo(anexo){this.anexo = anexo;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}