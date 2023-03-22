
const { ValidateUserForm } = require('../Validations/ValidateUser');

const { UserSchema,User } = require('../Models/User');
const { GenerateHashedPassword } = require('../Helpers/PasswordManager');

const mongoose = require('mongoose');

const GetUserByName = (UserName) => {
    
}
const InserNewUser = (name,password,role)=>{
    // hash password : 
    let new_user = {};
    let message = "";
    let state = 100;
    const hashed_password = GenerateHashedPassword(password);     
    const item_to_insert =User(
        {
            name:name,
            password:hashed_password,
            role:role
        }
    );
    // save the current record :
    try{
        item_to_insert.save();
        new_user = item_to_insert;
        message ="User Created ";
        state = 200;
    }catch{
        new_user={};
        message="Error Insert User";
        state=400;
    }
    return {
        new_user,
        message,
        state
    };
}




module.exports = {
    InserNewUser
};



