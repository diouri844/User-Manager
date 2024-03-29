// define as router :


const Router = require('express').Router();
const { 
    getUsersController, 
    getUserController , 
    createUserController, 
    UpdateUserController,
    DeleteUserController
    } = require("../Controllers/UserController");
const CheckAuth = require("../middleware/Auth");

// define crud operations :

Router.get('/feeds',CheckAuth,getUsersController);
// create new endpoint to get a feed by id 
Router.get('/feeds/:id',CheckAuth,getUserController);
// router to create new feed <user> 
Router.post('/feeds',CheckAuth,createUserController);
// router to updae feed <user>: 
Router.put('/feeds/:id',CheckAuth,UpdateUserController);
// router to delete feed <user>: 
Router.delete('/feeds/:id',CheckAuth,DeleteUserController);



module.exports =  Router;