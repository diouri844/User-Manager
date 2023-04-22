
//const { ValidateUserForm } = require('../Validations/ValidateUser');

const { User } = require('../Models/User');
const { GenerateHashedPassword } = require('../Helpers/PasswordManager');

const { generateAccessToken } = require('../Helpers/JwtManager');

const mongoose = require('mongoose');

const GetUserByName = async(UserName) => {
    return await User.findOne({ name:UserName }); 
};



const GetUserList = async() => {
    return await User.find({});
}


const InserNewUser = async (name,password,role)=>{
    // hash password : 
    let new_user = {};
    let message = "";
    let state = 100;
    // check user by name : 
    const user = await GetUserByName(name);
    // check if user exist :
    if( user !=null ){
        message = "User Already Exist";
        state = 400;
    }
    else{
        const hashed_password = GenerateHashedPassword(password);     
        const item_to_insert = User(
            {
                name:name,
                password:hashed_password,
                role:role
            }
        );
        // save the current record :
        try{
            await item_to_insert.save();
            new_user = item_to_insert;
            message ="User Created ";
            state = 200;
        }catch(err){
            new_user={};
            message="Error Insert User : "+err;
            state=400;
        }
    };
    return {
        new_user,
        message,
        state
    };
}



const ChechUser = async (name,password)=>{
    // check user by name : 
    const user = await GetUserByName(name);
    // check if user exist :
    if( user === null ){
        return {
            message:"User Not Exist",
            user:null,
            connected:false
        };
    }
    else{
        const hashed_password = GenerateHashedPassword(password);     
        if( hashed_password == user.password ){
            // generate token :
            const login_token =  generateAccessToken(name);
            // update the token attribute of the current connected user :
            const auth_token = login_token;
            await user.save();
            return {
                user:user,
                message:"Login Successful",
                token: auth_token,
                connected:true
            };
        }
        else{
            return {
                user:{},
                message:"Email or Password Incorrect",
                connected:false
            };
        }
    }
}


module.exports = {
    InserNewUser,
    ChechUser,
    GetUserList,
    GetUserByName
};



