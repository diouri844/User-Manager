// import express route : 

const Router = require('express').Router();

// import the controller handlers : 

const { getGigsController, createGigsController } = require('../Controllers/GigaController');
const CheckAuth = require("../middleware/Auth");

// setup the router :  
Router.get('/Gigs',CheckAuth,getGigsController);
Router.post('/Gigs', CheckAuth, createGigsController);

// export the router : 

module.exports = Router;