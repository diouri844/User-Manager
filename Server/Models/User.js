

const { GenerateHashedPassword } = require('../Helpers/PasswordManager');

const UserRole =  {
    user:"User",
    stuff:"Stuff",
    admin:"Admin"
};


// Require Mongoose
const mongoose = require("mongoose");

// Define a schema


const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});



// create a static method fired before each registration : 


UserSchema.pre('save', async function(next) {
    try{
        const hashedPassword = await GenerateHashedPassword( this.password );
        // update the current user password before vasing it in the database:
        this.password = hashedPassword;
        // call the next method  
        next();
        // move out frome the middleware : 
        return;
    }catch ( error ){
        next(error);
        return;
    }
})





const User = mongoose.model("User",UserSchema);
// define my modal and use my pre-difinate schema : 
module.exports = {
    User,
    UserSchema
};