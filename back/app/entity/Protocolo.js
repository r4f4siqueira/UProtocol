//Empresa.js
module.exports = class Protocolo {
    //propriedades e funções da classe aqui
    constructor() {
        this.id = 0;
        this.atendente = 0;
        this.cliente = "";
        this.situacao = "";
        this.prioridade = 0;
        this.pessoaAtendida = "";
        this.motivo = "";
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
    get atendente(){return this.atendente;}
    get cliente(){return this.cliente;}
    get situacao(){return this.situacao;}
    get prioridade(){return this.prioridade;}
    get pessoaAtendida(){return this.pessoaAtendida;}
    get motivo(){return this.motivo;}
    get dataC(){return this.dataC;}
    get userC(){return this.userC;}
    get userM(){return this.userM;}
    get dataM(){return this.dataM;}
    get empresa(){return this.empresa;}
    
    //set
    set id(id){this.id = id;}
    set atendente(atendente){this.atendente = atendente}
    set cliente(cliente){this.cliente = cliente;}
    set situacao(situacao){this.situacao = situacao;}
    set prioridade(prioridade){this.prioridade = prioridade;}
    set pessoaAtendida(pessoaAtendida){this.pessoaAtendida = pessoaAtendida;}
    set motivo(motivo){this.motivo = motivo}
    set dataC(dataC){this.dataC = dataC;}
    set userC(userC){this.userC = userC;}
    set dataM(dataM){this.dataM = dataM;}
    set userM(userM){this.userM = userM;}
    set empresa(empresa){this.empresa = empresa;}

}