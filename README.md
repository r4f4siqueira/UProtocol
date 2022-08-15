# UProtocol

### After install PostegreSQL 14.4-1
### After install node 16.15.1

## Step 1 : Install dependencies
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
## Step 2 : Create bd struture

### 1 - Create database in PostgreSQL: `uprotocol`

```SQL
CREATE DATABASE uprotocol
```

### 2 - Review the .env file

in `back/.env` set `DB_USER` and `DB_PASSWORD` according to your database username and password, as shown in the example below

```javascript
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
APP_NAME=AdonisJs
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=bHaSTp0PIkZKnLqKdWRj0sYEcLj61GaG
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=myUser
DB_PASSWORD=myPassword
DB_DATABASE=uprotocol
HASH_DRIVER=bcrypt
```

### 3 - Run commands in terminal:

📂 back
```bash
adonis migration:run
```

## Step 3 : Review the firebaseConnection.js file

It may be that the system does not work because the firebaseConnection.js file is missing;

Inside `front/src/services` put the file named `firebaseConnection.js` this file can be generated when creating a project in [Firebase](https://firebase.google.com/ "Firebase") ( [check the documentation](https://firebase.google.com/docs/web/setup "Documentation"));


firebaseConnection.js file structure:
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

## Step 4 : Run system
In the command line terminal run:

📂 back
```bash
adonis serve
```
📂 front
```bash
npm start
```
### Open http://127.0.0.1:3000 in your browser

## More info

### Test
If you want to run the tests, just go to the `back/` folder and run the command `adonis test` in terminal.