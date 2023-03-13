const User = require('../Models/User');

const Router = require('express').Router();

//const sqlite = require('sqlite3').verbose();

//const { GetDb } = require('../DB-Config/DBManager');


const { InserNewUser } = require('../DB-Config/UserManager');

// Login handler : 
Router.post("/login",
    (req,res )=>{
        // get request body :
        console.log(
            req.body.name,
            req.body.email,
            req.body.password,
        );
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
        const new_user = new User(
            req.body.name,
            req.body.password
        );
        const response = InserNewUser(new_user);
        if ( response ){
            res.send(
                response
            );
        }
        res.send(
            {
                state:200,
                user:new_user,
                created:true
            }
        )
    }
);





module.exports = Router;