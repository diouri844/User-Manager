const  User = require("../Models/User");




const ValidateUserForm = (user_target)=>{
    // check user format :
    console.table(
        user_target
    );
    return true;
}






module.exports = {
    ValidateUserForm
}