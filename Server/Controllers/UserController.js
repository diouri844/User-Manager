// create all the controllers of a user entity and expo
const  { GetUserByName, GetUserList } = require('../DB-Config/UserManager');

const { GenerateHashedPassword } = require('../Helpers/PasswordManager');

const  { ValideObjectId } =require("../Validations/ValidateUser");
const { User } = require('../Models/User');

const getUsersController = async ( req, res ) =>{
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
                by: req.body.user || ''
            },
            OperationBy: req.body.user || {}
        }
    );
}


const UpdateUserController = async ( req, res) => {
    // get user id from request params : 
    const { feed_id } = req.params;
    // check if is a valid Object Is later ..... 
    if ( ! ValideObjectId( feed_id ) ) {
        res.status(500).json(
            {
                message: " Feed ID is not a valid"
            }
        );
    }
    // get the target user : 
    try{
        const user_to_update = await User.findByIdAndUpdate( 
            feed_id, 
            req.body,
            { new: true} 
        );
        // all is greate return the success state :
        res.status(200).json({
            user: user_to_update || {},
            message: 'Success',
            operation: {
                name: 'Update feed by id',
                date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                by: user_token._id
            },
            OperationBy: req.body.user_token || {}
        });
    }catch( err ){
        res.status(500).json(
            {
                message: err.message
            }
        );
    }
}

const getUserController = async (req, res) => {
    // get user name and password from request headre
    const { id }  = req.params;
    console.log( id );
    // check if the id is a valid Oid : 
    if ( ! ValideObjectId( id ) ) {
        res.status(500).json(
            {
                message: " Feed ID is not a valid"
            }
        );
    }
    // all is grateful :
    // try to get feed : 
    try {
        const user = await User.findOne({'_id':id});
        res.status(200).json({
            user: user || {},
            message: 'Success',
            operation: {
                name: 'get feed by id',
                date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                by: ''
            },
            OperationBy: {}
        });
    }catch ( err ){
        res.status(500).json(
            {
                message: err.message
            }
        );
    }
    
}

const createUserController = async (req, res) => {
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
}

module.exports = {
    getUsersController,
    UpdateUserController,
    getUserController,
    createUserController
}