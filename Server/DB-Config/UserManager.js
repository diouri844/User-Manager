
//const { ValidateUserForm } = require('../Validations/ValidateUser');

const { User } = require('../Models/User');
const { GenerateHashedPassword } = require('../Helpers/PasswordManager');
const { generateAccessToken } = require('../Helpers/JwtManager');


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
        const item_to_insert = User(
            {
                name,
                password,
                role
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
    if( !user ){
        return {
            message:"User Not Exist",
            user:null,
            connected:false
        };
    }
    else{
        console.log(
            password,
            "\n",
            user
        );
        const hashedPassword = await GenerateHashedPassword(password);
        if( user.password === hashedPassword ){
            // generate token :
            const token =  generateAccessToken(name);
            // update the token attribute of the current connected user :
            return {
                user:user,
                message:"Login Successful",
                token,
                connected:true
            };
        }
        else{
            return {
                user:{},
                message:"UserName or Password Incorrect",
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



