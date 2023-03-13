
const path = require("path");
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { ValidateUserForm } = require('../Validations/ValidateUser');


const InserNewUser = (User) =>{
    // valdate User : 
    const isValideUser = ValidateUserForm(User); 
    if ( isValideUser ){
        // check if user not already exist : 
        const getQuery = `
        SELECT * FROM Users WHERE Users.Name = '${User.Name}'
        `;
        // conect to the db : 
        open({
            filename:path.join(__dirname,"./","UserManager.db"),
            driver: sqlite3.Database
        })
        .then(
            db =>{
                db.all(
                    getQuery,
                    [],
                    (err,rows) => {
                        if ( err ){
                            return console.error(err.message);
                        }
                        //res.render("books", { model: rows });
                        console.log({ model: rows });
                    }    
                )
            }
        ) ;
        // run the command : 
        
        
        // generate query to insert new user : 
        const inserQuery = `
            INSERT INTO Users Values (
                NULL,'${User.Name }','${User.GenerateHashedPassword()}'
            );
        `; 
        open({
            filename:path.join(__dirname,"./","UserManager.db"),
            driver: sqlite3.Database
        }).then( db =>{
            db.run(
                inserQuery,
                err =>{
                    if ( err ){
                        return console.error(err.message );
                    }
                }
            )
        }).catch( error => console.error(" Cann not connected :   ",error));
        ;
            // run the command : 
            return;
    }
    return console.error("User Validate Error ");
};


// export methods 
module.exports = { InserNewUser };