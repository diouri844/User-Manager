
const bcrypt = require('bcrypt');



const GenerateHashedPassword = async (password) =>{
        // create a slat
        const slat = process.env.HASHING_SALT;
        const hash = await bcrypt.hash(password , slat);
        return hash;
};


const IsMatchPassword =  async (UserPassword,RequestPassword) => {
    var result = false;
    await bcrypt.compare(
         RequestPassword, 
         UserPassword
         ).then( 
            res => {
                console.log(" matching password ");
                console.log( res );
                result = true;
                return;
         });
    return result;
};



module.exports = {
    GenerateHashedPassword,
    IsMatchPassword
};