// create a authentication chack middelware for user authentication
const jwt = require('jsonwebtoken');
const { User } = require("../Models/User");


const CheckAuth = async (req, res, next ) => {
    // get token from request header : 
    try{
        console.table(req.headers);
        const token = req.headers.authorization.split(' ')[1];
        if( !token ){
            res.status(400).json({ message: "You are not authorized"});
            return;
        }
        jwt.verify(
            token, 
            process.env.JWT_TOKEN_SECRET,
            async (err, user_payload) => {
                if ( err ){
                    res.status(401).json({ message: err.message });
                    return;
                }
                const user_target =  await User.findOne(
                    {
                        name: user_payload.name
                    }
                );
                req.user_token = user_target; 
                return next();
            });
    }catch ( err ){
        console.error( err.message );
        res.status(500).json(
            {
                message:err.message
            }
        );
    }
}



module.exports = CheckAuth;