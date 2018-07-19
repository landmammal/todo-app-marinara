const express = require('express');
const mysql = require('mysql');
const app = express();
const todoController = require('./controllers/todoController');
const myDatabase = require('./db');
var i ="roger";

// setting tamplating engine
app.set('view engine', 'ejs');

// static file management
app.use(express.static('./public'));

// linking controller files
todoController(app, myDatabase(mysql));


// listeing to file
app.listen(3000);
console.log('You are listening to port 3000');
