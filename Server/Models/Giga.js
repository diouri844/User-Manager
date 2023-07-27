// import mongosse : 
const mongoose = require('mongoose');


// setup a giga schema 


const GigaSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    author_id:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    body:{
        type:String,
        required:true
    },
    haseImg:{
        type:Boolean,
        required:true,
        default:false
    },
    imgUrl:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    shares:{
        type:Number,
        default:0
    }
});

// create and export a model from the created schema : 

const Giga = mongoose.model("Giga",GigaSchema);

module.exports = {
    Giga,
    GigaSchema
};