const User = require('../Models/User');

const Router = require('express').Router();
// add a check point for the user password 


const { LoginController, 
        RegisterController, 
        CheckPasswordController
    } = require('../Controllers/AuthController');

// Login handler : 
Router.post("/login",LoginController);

// Registration Handler : 
Router.post("/register",RegisterController);

// add the check  handler : 

Router.post('/checkPassword/:userId',CheckPasswordController);

module.exports = Router;