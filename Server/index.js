

// import express pack :
const express = require('express');
// import morgan for midellware
const morgan = require('morgan');

// import parser module : 
const bodyparser = require('body-parser');


// import my sqlite module :

//const sqlite = require('sqlite3').verbose();

const AuthRouter = require('./Routes/Auth');
const UserRouter = require('./Routes/User');
const GigaRouter = require('./Routes/Giga');

const cors = require('cors');
const manageCors = require('./middleware/Cors');

const { MakeConnexion  } = require("./DB-Config/DBManager");


// create my server application : 

my_server = express();
my_server.use(cors());
my_server.use((req, res, next)=>{
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// use morgan : 
my_server.use(morgan('tiny'));
my_server.use(bodyparser.urlencoded({extended:true}));
my_server.use(bodyparser.json())

// use my auth router :


my_server.use(
    '/api/users',
    AuthRouter
);


// add user crud router :

my_server.use(
    '/api/manager',
    UserRouter
);

// add giga crud router : 
my_server.use(
    '/api/publications',
    GigaRouter
);


// confing my server : node

my_server.listen(8080, async ()=> {
    console.log( "the shit happen  at http://localhost:8080  ");
    await MakeConnexion();
});

