const mongoose = require("mongoose");
const  User = require("../Models/User");




const ValidateUserForm = (user_target)=>{
    // check user format :
    if ( ! user_target.hasOwnProperty('name')
        ){
        return {
            state : false ,
            details: { 
                name:"Name is required"
            }
        };
    }
    if (  ! user_target.hasOwnProperty('password') ){
        return {
            state : false ,
            details: { 
                password:"Password is required"
            }
        };
    }
    if (! user_target.hasOwnProperty('email')){
        return {
            state : false ,
            details: {
                email: "Email is required"
            }
        };
    }
    // check user email : 
    if (
        user_target.name.length === 0 
        || user_target.email.includes(' ')){
            return {
                state : false ,
                details: { 
                    name:"Name not valid "
                }
            };
        }
    if (  
        user_target.password.length < 7 ||
        user_target.password.includes(' ')){
            return {
                state : false ,
                details: { 
                    password:"Password not valid "
                }
            };
        }
        if (
            user_target.email.length < 7 ||
            user_target.email.includes(' ')){
                return {
                    state : false ,
                    details: { 
                        email:"Email not valid "
                    }
                };
            }
    return {
        state:true,
        details:{}
    }
}


const ValideObjectId = ( id_target )=>{
    return mongoose.Types.ObjectId.isValid(id_target);
}





module.exports=  {
    ValidateUserForm,
    ValideObjectId
}