const sqlite = require('sqlite3').verbose();
const path = require("path");




// create Db : 

const CreateNewDataBase = ()=>{
    const dbName = path.join(__dirname,"./","UserManager.db");
    // create it : 
    const Db = new sqlite.Database(
        dbName,
        err =>{
            if ( err ){
                return console.error("Naaah , error Create Db file :  "+err.message);
            }
        console.log("Successful connection to the database 'UserManager.db'");
        }
    );
    // Db Created : Now Create Users Table : 
    CreateUserTable(Db);
};



const GetDb = ()=> {
    return new sqlite.Database(
        path.join(__dirname,"./","UserManager.db"),
        err =>{
            if ( err ){
                return console.error("Naaah , error Create Db file :  "+err.message);
            }}
    );
}
// Create User Table : 

const CreateUserTable = (db_target)=>{
    const QueryStatment = `
        CREATE TABLE IF NOT EXISTS Users (
        User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR(100) NOT NULL,
        Password VARCHAR(100) NOT NULL
        );
    `;
    // run query : 
    db_target.run(
        QueryStatment,
        err => {
            if ( err ){
                return console.error("Naaah , error Create Users Table :  "+err.message);
            }
            console.log("Successful creation of the 'Users' table");
        }
    );
};




















module.exports = {
    CreateNewDataBase,GetDb
};