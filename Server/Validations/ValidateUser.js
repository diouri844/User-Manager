const mongoose = require("mongoose");
const  User = require("../Models/User");




const ValidateUserForm = (user_target)=>{
    // check user format :
    if ( ! user_target.name || ! user_target.password ){
        
        return {
            state : false ,
            details: { 
                name:"Name is required", 
                password:"Password is required"
            }
        };
    }

    // check user email : 
    if ( user_target.name.length === 0 
        || user_target.email.includes(' ')){
            return {
                state : false ,
                details: { 
                    name:"Name not valid "
                }
            };
        }
    if ( user_target.password.length < 7 ||
        user_target.password.includes(' ')){
            return {
                state : false ,
                details: { 
                    password:"Password not valid "
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