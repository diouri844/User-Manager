


const jwt = require('jsonwebtoken');

const  generateAccessToken = (username, hashed_password) => 
{
    return jwt.sign(username, hashed_password, { expiresIn: '1800s' });
}



module.exports = {
    generateAccessToken
}