// define as router :


const Router = require('express').Router();
const { User }  = require('../Models/User');
const { GetUserByName } = require('../DB-Config/UserManager');
const { GenerateHashedPassword } = require('../Helpers/PasswordManager');
// define crud operations :


Router.get('/feeds', 
    async ( req, res )=>{
        // get user name and password from request headre
        const { name, pswd } = req.headers;
        console.log(
            name,
            pswd,
        );
        // check if username and password is valid
        if(!name ||!pswd){
            res.status(401).json({
                message: ' username and  password required' 
            })
        }

        // get user from database
        const user = await GetUserByName(name)
            console.log(
                user
            );
        if ( user === null ){
            res.status(402).json({
                message: 'Invalid username or password'
            });
        }
        // check password hased is match or not : 
        if ( user.password!== GenerateHashedPassword(pswd) ){
        // check if user exists
            res.status(404).json({
                message: 'Invalid password'
            });
        }

        res.status(200).json(
            { 
                users: [],
                message: 'Success',
                operation: {
                    name: 'get feeds',
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/')
                },
                user: user
            }
        );
    }

)






module.exports = Router;