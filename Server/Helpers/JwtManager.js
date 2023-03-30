


const jwt = require('jsonwebtoken');

const  generateAccessToken =  async (username, hashed_password ) => 
{
    return  await jwt.sign(
        {   name: username , 
            password: hashed_password,
        } , 
        hashed_password, 
        { expiresIn: '1800s' }
    );
}



module.exports = {
    generateAccessToken
}