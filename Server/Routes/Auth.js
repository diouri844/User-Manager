const User = require('../Models/User');

const Router = require('express').Router();

//const sqlite = require('sqlite3').verbose();

//const { GetDb } = require('../DB-Config/DBManager');


const { InserNewUser } = require('../DB-Config/UserManager');



// Login handler : 
Router.post("/login",
    (req,res )=>{
        // get request body :
        // export name email password from req.body :
        const { name, email, password } = req.body;
        // insert new User : 
        const my_user = User(
            name,
            email,
            password
        );
        // trye to insert my user target : 

        res.send(
            {
                action:'Login',
                Data:req.body
            }
        );
    }
);



// Registration Handler : 
Router.post("/register",
    (req,res) =>{
        // get body : 
        const { name ,password, role } = req.body;
        const response = InserNewUser(
            name,
            password,
            role
        );
        res.send(
                {
                    state:response.state,
                    user:response.new_user,
                    created:response.state === 200
                }
                );
        }
);





module.exports = Router;