

// import express pack :
const express = require('express');
// import morgan for midellware
const morgan = require('morgan');

// import parser module : 
const bodyparser = require('body-parser');


// import my sqlite module :

//const sqlite = require('sqlite3').verbose();

const AuthRouter = require('./Routes/Auth');


const { MakeConnexion  } = require("./DB-Config/DBManager");


// create my server application : 

my_server = express();

// use morgan : 
my_server.use(morgan('tiny'));
my_server.use(bodyparser.urlencoded({extended:true}));
my_server.use(bodyparser.json())
// use my auth router :


my_server.use(
    '/api/users',AuthRouter
);




// confing my server : node

my_server.listen(8080, async ()=> {
    console.log( "the shit happen  at http://localhost:8080  ");
    await MakeConnexion();
});

