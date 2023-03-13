

const crypto = require('crypto');
const  User = class {
    constructor(name,password){
        this.name = name;
        this.password = password
    }
    get Name(){
        return this.name;
    }
    get Password(){
        return this.password;
    }
    // methods : 
    GenerateHashedPassword(){
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(this.password).digest('base64');
        return hash;
    }
}





module.exports = User;