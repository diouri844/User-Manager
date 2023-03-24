const User = require('../Models/User');

const Router = require('express').Router();


const { InserNewUser, ChechUser } = require('../DB-Config/UserManager');



// Login handler : 
Router.post("/login",
    async (req,res )=>{
        // export name email password from req.body :
        const { name, password } = req.body;
        // trye to insert my user target : 
        const {user,message,connected } = await ChechUser(
            name,
            password
        );
        res.send(
            {
                user,
                message,
                connected
            }
        );
    }
);



// Registration Handler : 
Router.post("/register",
    async (req,res) =>{
        // get body : 
        const { name ,password, role } = req.body;
        const response = await InserNewUser(
            name,
            password,
            role
        );
        res.send(
                {
                    state:response.state,
                    user:response.new_user,
                    message:response.message,
                    created:response.state === 200
                }
                );
        }
);





module.exports = Router;