const { InserNewUser,
        ChechUser,
        CheckPassword  } = require('../DB-Config/UserManager');

const { ValidateUserForm } = require('../Validations/ValidateUser');

const { generateAccessToken } = require("../Helpers/JwtManager");

const LoginController = async (req,res )=>{
    // export name email password from req.body :
    const { name, password } = req.body;
    // trye to insert my user target :
    const {user,message,token ,connected } = await ChechUser(
        name,
        password,
    );
    res.send(
        {
            user,
            message,
            connected,
            token
        }
    );
}

const RegisterController = async (req,res) =>{
    // get body :
    // check user format
    const { state , details } = ValidateUserForm(req.body);
    if ( ! state ){
        // there is a error message into details object :
        res.status(501).json(
            {
                message: details,
                state
            }
        );
        return;
    }
    const { name ,password, role, email } = req.body;
    const response = await InserNewUser(
        name,
        password,
        role,
        email
    );
    // genrate a access token for current logged user :
    if ( response.state === 200 ){
        const token = generateAccessToken(response.new_user.name);
        res.send(
            {
                state:200,
                user:response.new_user,
                message:response.message,
                token
            }
        );
    }else{
    res.send(
            {
                state:response.state,
                user:response.new_user,
                message:response.message,
                created:response.state === 200
            }
            );
    }
};



// create a controller to handel a user check new vs old password :


const CheckPasswordController = async (req,res) =>{
    // get the new password from the request body :
    const { password } = req.body;
    // get user id from the request parameters :
    const userId = req.params.userId;
    // check password :
    const { state,
            message,
            isEquales } = await CheckPassword(password, userId);
    res.status(state).json({
        message,
        isEquales
    });
};


module.exports = {
    LoginController,
    RegisterController,
    CheckPasswordController
};
