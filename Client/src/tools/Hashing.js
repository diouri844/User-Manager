import bcrypt from 'bcryptjs';


const HASHING_SALT = "$2b$10$pZlrgFD7tyX1bxeNXri8BO";

const GenerateHashedPassword = async (password) =>{
    // create a slat
    const hash = await bcrypt.hash(password , HASHING_SALT);
    return hash;
};


export default GenerateHashedPassword;