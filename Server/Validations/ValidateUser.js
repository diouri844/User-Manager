const mongoose = require("mongoose");
const  User = require("../Models/User");




const ValidateUserForm = (user_target)=>{
    // check user format :
    console.table(
        user_target
    );
    return true;
}


const ValideObjectId = ( id_target )=>{
    return mongoose.Types.ObjectId.isValid(id_target);
}





module.exports=  {
    ValidateUserForm,
    ValideObjectId
}