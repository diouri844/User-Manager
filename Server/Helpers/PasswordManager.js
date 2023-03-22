




const crypto = require('crypto');

const GenerateHashedPassword = (password) =>{
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
};



module.exports = {
    GenerateHashedPassword
};