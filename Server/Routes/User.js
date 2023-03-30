// define as router :


const Router = require('express').Router();
const { User }  = require('../Models/User');
const { GetUserByName, GetUserList } = require('../DB-Config/UserManager');
const { GenerateHashedPassword } = require('../Helpers/PasswordManager');
// define crud operations :


Router.get('/feeds', 
    async ( req, res )=>{
        // get user name and password from request headre
        const { name, pswd } = req.headers;
        // check if username and password is valid
        if(!name ||!pswd){
            res.status(401).json({
                message: ' username and  password required' 
            })
        }

        // get user from database
        const user = await GetUserByName(name)
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
        // user exist and password is valid : 
        // check if user connected or not : hase a token not equal to 0000:
        if ( user.token === '0000' ){
            res.status(401).json({
                message: 'User is not connected'
            });
        }
        // check user permissions : if role is admin :
        if ( user.role != 'admin' ){
            res.status(404).json({
                message: 'Permission denied to access feeds',
                operation: {
                    name: 'get feeds',
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    by: user._id
                },
                OperationBy: user
            });
        }
        // all is greate now we sould get list of users :
        // user exist and password is valid :
        const response_user = await GetUserList();
        res.status(200).json(
            { 
                users: response_user || [],
                message: 'Success',
                operation: {
                    name: 'get feeds',
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    by: user._id
                },
                OperationBy: user
            }
        );
    }
);




// router to create new feed <user> 


Router.post('/feeds', 
    async (req, res) => {
        // get body from request :
        const { Bodyname, Bodypswd, Bodyrole } = req.body;
        // get token from header:
        const { name, pswd } = req.headers;

        if ( !Bodyname ||!Bodypswd ||!Bodyrole ){
            res.status(401).json(
                {
                message: 'username, password and role required'
                }
            );
        }
        // check tokent usr is valid or not : 
        const userToken = await GetUserByName(name);
        if ( userToken === null ){
            res.status(402).json(
                {
                message: 'Invalid Connexion token'
                }
            );
        }
        // check password hased is match or not : 
        if ( userToken.password !== GenerateHashedPassword(pswd) ){
            res.status(404).json(
                {
                    message: 'Invalid Password token'
                }
            );        
        }
        // chekc if user connected : 
        if ( userToken.token!== '0000' ){
            res.status(401).json(
                {
                    message: 'User is not connected'
                }
            );
        }
        // check user permissions : if role is admin :
        if ( userToken.role!= 'Admin' ){
            res.status(404).json(
                {
                    message: 'Permission denied to access feeds',
                    operation: {
                        name: 'create new feed',
                        date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                        by: userToken._id
                    },
                    OperationBy: userToken
                }
            );
        }
        // all is greate now we sould get list of users :
        // chec if user name is already used :
        const user = await GetUserByName(name);
        if ( user != null){
            res.status(401).json(
                {
                message: 'username already used'
                }
            );
        }
        // create new user :
        const new_user = await User.create({
            name: Bodyname,
            password: GenerateHashedPassword(Bodypswd),
            role: Bodyrole,
            token: '0000'
        });
        res.status(200).json(
            {
                message: 'Success',
                operation: {
                    name: 'create new feed',
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    by: userToken._id
                },
                OperationBy: userToken
            }
        ); 
    });



module.exports = Router;