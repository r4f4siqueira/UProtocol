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

2 - Run commands in terminal:

📂 back
```bash
adonis migration:run
```

## Step 3 : Run system

📂 back
```bash
npm start
```
📂 front
```bash
npm start
```
### Open http://localhost:3000/ in your browser

## More info

### Firebase
It may be that the system does not work because the firebaseConnection.js file is missing;

Inside `front/src/services` put the file named `firebaseConnection.js` this file can be generated when creating a project in [Firebase](https://firebase.google.com/ "Firebase") ( [check the documentation](https://firebase.google.com/docs/web/setup "Documentation"));


FirebaseConnection.js file structure:
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

### Test
If you want to run the tests, just go to the `back/` folder and run the command `adonis test` in terminal.

