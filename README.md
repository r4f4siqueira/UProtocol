<div> 
<img src="https://forthebadge.com/images/badges/0-percent-optimized.svg" height="32"/>
<img src="https://forthebadge.com/images/badges/works-on-my-machine.svg" height="32"/>
<img src="https://forthebadge.com/images/badges/designed-in-ms-paint.svg" height="32"/>
<img src="https://forthebadge.com/images/badges/it-works-why.svg" height="32"/>
<img src="https://forthebadge.com/images/badges/powered-by-black-magic.svg" height="32"/>
</div>

# UProtocol

- [😪 Inplantação](#inplantação)
    - [😑 Passo 1 : Instalar Depêndencias](#passo-1--instalar-depêndencias)
    - [🤨 Passo 2 : Criar estrutura do banco de dados](#passo-2--criar-estrutura-do-banco-de-dados)
    - [😮 Passo 3 : Revise o arquivo firebaseConnection.js](#passo-3--revise-o-arquivo-firebaseconnectionjs)
    - [😎 Passo 4 : Execute o sistema](#passo-4--execute-o-sistema)
- [🧐 Mais informações](#mais-informações)
    - [🥺 Teste](#teste)
    - [🤪 Diagrama de Classe](#diagrama-de-classe)
    - [😵 Insomnia](#insomnia)
- [🤔 Doc API](https://github.com/r4f4siqueira/UProtocol/tree/master/back#api-doc)
- [😀 Manual do Usuário](https://github.com/r4f4siqueira/UProtocol/wiki/Manual-do-Usu%C3%A1rio)
- [🙃 Anexos](https://github.com/r4f4siqueira/UProtocol/tree/master/docs)

## Inplantação
### Passo 1 : Instalar Depêndencias


#### Instalar PostegreSQL 14.4-1
#### Instalar node 16.15.1

Obs: temos duas pastas **back** e **front**, pois o **back** funciona separado do **front**, logo precisa instalar as dependências de forma separada ex:

#### 📂 back
```bash
cd back/
npm install
npm install -g @adonisjs/cli
```
#### 📂 front
```bash
cd front/
npm install
```

### Passo 2 : Criar estrutura do banco de dados

#### 1 - Criar banco de dados no PostgreSQL: `uprotocol`

```SQL
CREATE DATABASE uprotocol
```


#### 2 - Revise o arquivo **.env**

O arquivo se encontra em `back/.env`, verifique se os parametros estão de acordo com a instalação do postgreSQL, atenção para as linhas `10,11,12,13`
```
DB_PORT
DB_USER
DB_PASSWORD
DB_DATABASE
```
Exemplo de como o arquivo deve ficar:
```
HOST=127.0.0.1
PORT=3334
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=bHaSTp0PIkZKnLqKdWRj0sYEcLj61GaG
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=uprotocol
HASH_DRIVER=bcrypt
```


#### 3 - Execute as **migrations**

📂 back
```bash
adonis migration:run
```


### Passo 3 : Revise o arquivo **firebaseConnection.js**

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


### Passo 4 : Execute o sistema
Abra dois terminais de linha de comando, um na pasta `back/` e outro na pasta `front/` e execute os seguintes comandos:

📂 back
```bash
adonis serve
```
📂 front
```bash
npm start
```
#### Acesse o link http://127.0.0.1:3004 no seu navegador
Normalmente ao executar o comando `npm start` o projeto já será aberto em seu navegador, caso não abra acesse o link acima

## Mais informações

### Teste
Caso queira executar os testes, basta ir até a pasta `back/` e executar o comando `adonis test` no terminal.

### Diagrama de classe
Diagrama de classe disponível em 👉 [Diagrams.net](https://drive.google.com/file/d/1U-_OeJ8yAzngDXw-WTMy6UktqwE2nO1h/view?usp=sharing)

### Insomnia
Faça o dawload do arquivo JSON disponivel no link [Insomnia.json](/docs/Insomnia.json) e importe no IMSOMNIA caso queira testar as rotas ou retornos da API

