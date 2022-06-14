//Empresa.js
module.exports = class Repasse {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.usuarioAtual = 0;
        this.protocolo = 0;
        this.usuarioDestino = 0;
        this.dataC = new Date();
        this.userC = "";
        this.userM = "";
        this.dataM = new Date();
        this.empresa = 0;
    }

    //Metodos da classe
    inserirDados(){
        //inserir dadodos
    }

    alterarDados(){
        //alterar dados
    }

    //get
    get id(){return this.id;}
    get usuarioAtual(){return this.usuarioAtual;}
    get protocolo(){return this.protocolo;}
    get usuarioDestino(){return this.usuarioDestino;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set usuarioAtual(usuarioAtual){this.usuarioAtual = usuarioAtual}
    set protocolo(protocolo){this.protocolo = protocolo;}
    set usuarioDestino(usuarioDestino){this.usuarioDestino = usuarioDestino;}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}