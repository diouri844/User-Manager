
const mongoose = require('mongoose');
require('dotenv').config();



// create connexion  : 

const MakeConnexion = async ()=>{
    // get my env uri : 
    const db_uri =  process.env.MONGO_DB_URI;
    // connect to uri target :
    await mongoose.connect(
        db_uri
    ).then(
        console.log(
            "\n ::> Conected to Db-could let make sheet done!"
        )
    ).catch( err => console.error(" Cann not make connexion : ", err));
};


















module.exports = {
    MakeConnexion
};