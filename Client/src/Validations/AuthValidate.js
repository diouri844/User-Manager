
// Validation for email adresse : 
export const ValidateEmail = (email) =>{
    if ( !email.includes('@') || email.includes(' ') ||
    email.length < 5 || email.trim().length === 0){
        return {
            Valide:false,
            Message:'Email must be a valide email addresse'
        };
    }
    return {
        Valide:true,
        Message:''
    }
};


// Vaidation for Password :


export const ValidatePassword = (password) =>{
    if ( password.length <5 || password.trim().length === 0 || password.includes(' ')){
        return {
            Valide:false,
            Message:'Password must not containe spaces or less than 6'
        };
    }
    return {
        Valide:true,
        Message:''
    }
};


