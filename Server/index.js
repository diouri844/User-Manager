

// import express pack :
const express = require('express');
// import morgan for midellware
const morgan = require('morgan');

// create my server application : 

my_server = express();

// use morgan : 
my_server.use(morgan('tiny'));

// confing my server : node

my_server.listen(8080, ()=> {
    console.log( "the shit happen  at http://localhost:8080  ");
});

