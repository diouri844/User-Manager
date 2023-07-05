// create all the controllers of a user entity and expo
const  { GetUserByName, GetUserList } = require('../DB-Config/UserManager');

const { GenerateHashedPassword } = require('../Helpers/PasswordManager');

const  { ValideObjectId } = require("../Validations/ValidateUser");

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
    const { id } = req.params;
    // check if is a valid Object Is later ..... 
    if ( ! ValideObjectId( id ) ) {
        res.status(500).json(
            {
                message: " Feed ID is not a valid"
            }
        );
    }
    // get the target user : 
    try{
        // check if there is a password into body :
        const pswd = req.body.password;
        if( pswd ){
            const newPswdHashed  = await GenerateHashedPassword( pswd );
            if( !newPswdHashed ){
                throw new Error ("Can not hash password ");
            }
            req.body.password = newPswdHashed;
        };
        const user_to_update = await User.findByIdAndUpdate( 
            id, 
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
                by: req.user_token._id
            },
            OperationBy: req.user_token || {}
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
                by: req.user_token._id
            },
            OperationBy: req.user_token
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
    // check user permissions : if role is admin :
    if (  req.user_token.role != 'Admin' ){
        res.status(404).json(
            {
                message: 'Permission denied to access feeds'
            }
        );
        return;
    }
    // all is greate now we sould get list of users :
    // chec if user name is already used :
    const user = await GetUserByName(Bodyname);
    if ( user != null){
        res.status(401).json(
            {
                message: 'username already used'
            }
        );
        return;
    }
    // create new user :
    try{
        const new_user = await User.create({
            name: Bodyname,
            password: GenerateHashedPassword(Bodypswd),
            role: Bodyrole
        });
        res.status(200).json(
            {
                message: 'Success',
                user: new_user || {},
                operation: {
                    name: 'create new feed',
                    date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    by: req.user_token._id
                },
                OperationBy: req.user_token
            }
        );
        return;
    }catch( err ){
        res.status(501).json(
            {
                message: err.message
            }
        );
    }
}



const DeleteUserController = async (req, res) => {
    if (  req.user_token.role != 'Admin' ){
        res.status(404).json(
            {
                message: 'Permission denied to access feeds'
            }
        );
        return;
    }
    // get the user target id from the request parameters :
    const  { id } = req.params;
    // check if is a valid mongo object id : 
    if ( ! ValideObjectId( id ) ){
        res.status(500).json(
            {
                message: " Feed ID is not a valid"
            }
        );
        return;
    }
    // all is great , try to get target by id and delete is :
    try{
        const targetUser = await User.findByIdAndDelete(id);
        res.status(200).json({
            user: targetUser || {},
            message: 'Success',
            operation: {
                name: 'Delete feed by id',
                date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                by: req.user_token._id
            },
            OperationBy: req.user_token || {}
        });
    }catch ( err ){
        res.status(501).json(
            {
                message: err.message
            }
        );
    }

};



module.exports = {
    getUsersController,
    UpdateUserController,
    getUserController,
    createUserController,
    DeleteUserController
}