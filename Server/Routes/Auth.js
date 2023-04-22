const User = require('../Models/User');

const Router = require('express').Router();

const { LoginController, RegisterController } = require('../Controllers/AuthController');

// Login handler : 
Router.post("/login",LoginController);

// Registration Handler : 
Router.post("/register",RegisterController);

module.exports = Router;