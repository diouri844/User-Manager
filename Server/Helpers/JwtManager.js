


const jwt = require('jsonwebtoken');

const  generateAccessToken =  (username ) => 
{
    return jwt.sign(
        {'name':username}
        ,process.env.JWT_TOKEN_SECRET,
        { expiresIn: '1800s' }
    );
};



module.exports = {
    generateAccessToken
}