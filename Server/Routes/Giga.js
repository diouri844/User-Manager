// import express route : 

const Router = require('express').Router();

// import the controller handlers : 

const { getGigsController, 
        createGigsController,
        getGigaAuthorInfoController,
        getMyGigsController,
        likeGigaController,
        dislikeGigaController,
        deleteGigsController
    } = require('../Controllers/GigaController');
const CheckAuth = require("../middleware/Auth");

// setup the router :  
Router.get('/Gigs',CheckAuth,getGigsController);
Router.post('/Gigs', CheckAuth, createGigsController);
Router.delete('/Gigs/:id',CheckAuth,deleteGigsController);
Router.get('/Gigs/me',CheckAuth,getMyGigsController);
Router.get('/Gigs/:id/Author',CheckAuth,getGigaAuthorInfoController);
Router.get('/Gigs/:id/Like',CheckAuth,likeGigaController);
Router.get('/Gigs/:id/Dislike',CheckAuth,dislikeGigaController);

// export the router : 

module.exports = Router;