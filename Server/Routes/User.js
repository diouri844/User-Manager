// define as router :


const Router = require('express').Router();
const { getUsersController, getUserController , createUserController, UpdateUserController} = require("../Controllers/UserController");
// define crud operations :

Router.get('/feeds',getUsersController);
// create new endpoint to get a feed by id 
Router.get('/feeds/:id', getUserController);
// router to create new feed <user> 
Router.post('/feeds',createUserController);
// router to updae feed <user>: 
Router.put('/feeds/:id', UpdateUserController);




module.exports =  Router;