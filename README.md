# UProtocol
## Passo 1 : Instalar Depêndencias

### Instalar PostegreSQL 14.4-1
### Instalar node 16.15.1

Obs: temos duas pastas **back** e **front**, pois o **back** funciona separado do **front**, logo precisa instalar as dependências de forma separada ex:
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
## Passo 2 : Criar estrutura do banco de dados

### 1 - Criar banco de dados no PostgreSQL: `uprotocol`

```SQL
CREATE DATABASE uprotocol
```

### 2 - Revise o arquivo **.env**

O arquivo se encontra em `back/.env`, verifique se os parametros estão de acordo com a instalação do postgreSQL, atenção para as linhas 
```
10|DB_PORT
11|DB_USER
12|DB_PASSWORD
13|DB_DATABASE
```
Exemplo de como o arquivo deve ficar:
```
01|HOST=127.0.0.1
02|PORT=3333
03|NODE_ENV=development
04|APP_NAME=AdonisJs
05|APP_URL=http://${HOST}:${PORT}
06|CACHE_VIEWS=false
07|APP_KEY=bHaSTp0PIkZKnLqKdWRj0sYEcLj61GaG
08|DB_CONNECTION=pg
09|DB_HOST=127.0.0.1
10|DB_PORT=5432
11|DB_USER=postgres
12|DB_PASSWORD=postgres
13|DB_DATABASE=uprotocol
14|HASH_DRIVER=bcrypt
```

### 3 - Execute as **migrations**

📂 back
```bash
adonis migration:run
```

## Passo 3 : Revise o arquivo **firebaseConnection.js**

Pode ser que o sistema não funcione porque o arquivo `firebaseConnection.js` não está no projeto;

Coloque o arquivo `firebaseConnection.js` no seguinte caminho `front/src/services`  este arquivo pode ser gerado ao criar um projeto no [Firebase](https://firebase.google.com/ "Firebase") ( [Verificar documentação do Firebase](https://firebase.google.com/docs/web/setup "Documentation"));

Esse arquivo é disponibilizado na entrega do módulo no classroom para os professores que irão avaliar 


Estrutura do arquivo `firebaseConnection.js` :
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

## Passo 4 : Execute o sistema
Abra dois terminais de linha de comando, um na pasta `back/` e outro na pasta `front/` e execute os seguintes comandos:

📂 back
```bash
adonis serve
```
📂 front
```bash
npm start
```
### Acesse o link http://127.0.0.1:3000 no seu navegador
Normalmente ao executar o comando `npm start` o projeto já será aberto em seu navegador, caso não abra acesse o link acima

## Mais informações

### Teste
Caso queira executar os testes, basta ir até a pasta `back/` e executar o comando `adonis test` no terminal.
