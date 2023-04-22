

//const crypto = require('crypto');

// define user object :
/*const  User = class {
    constructor(name,password){
        this.name = name;
        this.password = password
    }
    get Name(){
        return this.name;
    }
    get Password(){
        return this.password;
    }
    // methods : 
    GenerateHashedPassword(){
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(this.password).digest('base64');
        return hash;
    }
}*/

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

const User = mongoose.model("User",UserSchema);
// define my modal and use my pre-difinate schema : 
module.exports = {
    User,
    UserSchema
};