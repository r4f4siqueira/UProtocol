# UProtocol

### Instalar PostgreSQL 14.4-1
### Instalar node 16.15.1

## Passo 1 : Dependencias
### 📂 back
```bash
cd back/
npm install
npm install -g @adonisjs/cli
```
### 📂 front
```bash
cd front/
npm install
```
## Passo 2 : Estrutura do banco

### 1 - Criar o banco de dados no PostgreSQL: `uprotocol`

```SQL
CREATE DATABASE uprotocol
```

2 - Executar as migracoes no terminal

📂 back
```bash
adonis migration:run
```

## Passo 3 : Configurar Firebase
Para a conexao com o firebase funcionar é necessário o arquivo ´firebaseConnection.js´,
Esse arquivo é disponibilizado junto com a entrega da etapa para os professores que avaliarao
ele deverá ser inserido em: ´📂front/📂src/📂services/´



## Passo 4 : Iniciar o sistema

📂 back
```bash
npm start
```
📂 front
```bash
npm start
```
### Abrir http://127.0.0.1:3000/ no seu navegador

## MAis informacoes

### Firebase
O Arquivo ´firebaseConnection.js´ pode ser gerado ao iniciar um projeto no [Firebase](https://firebase.google.com/ "Firebase"), se for utilizar outro banco pelo firebase, é necessário ativar:
 - Firebase Auth com autenticacao por email e senha e Google
 - Firestore Database
Em caso de dúvidas ( [cheque a documentacao do firebase](https://firebase.google.com/docs/web/setup "Documentation"));

FirebaseConnection.js estrutura do arquivo:
```javascript
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "...",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
```

### Tests
Para executar os Testes, vá para a pasta `back/` e execute o comando `adonis test` no terminal.
