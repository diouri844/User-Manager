const { InserNewUser, ChechUser } = require('../DB-Config/UserManager');
const { ValidateUserForm } = require('../Validations/ValidateUser');

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
        console.log( details );
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
    res.send(
            {
                state:response.state,
                user:response.new_user,
                message:response.message,
                created:response.state === 200
            }
            );
    }


module.exports = { 
    LoginController,
    RegisterController
};