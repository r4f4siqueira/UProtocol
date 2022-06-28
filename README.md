# Welcome in the UProtocol

### After install PostegreSQL 14.4-1
### After install node 16.15.1

## stage one: install node dependencies
```
$ npm install -g @adonisjs/cli
```
```
$ cd ./back
$ npm install
```
```
$ cd ./front
$ npm install
```
## stage two: create bd struture
```
$ adonis migration:run
```