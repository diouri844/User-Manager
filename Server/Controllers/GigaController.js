// import required models :


const { Giga } = require('../Models/Giga');
//const { ValideObjectId } = require("../Validations/ValidateUser");
const { ValidateGigaPayload } = require('../Validations/ValidateGiga');
// create a async handelr to get all the new gigs added from user in the same circle :

const getGigsController = async ( req, res) =>{
    const fetchresult = await Giga.find({});
    console.log(
        req.user_token
    );
    res.status(200).json(
        {
            message:'Success',
            gigs: fetchresult,
            operation: {
                name: 'get Gigs',
                date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                by: req.user_token.id || ''
            }
        }
    );
};

// create a async handler to create new giga :

const createGigsController = async ( req, res) =>{
    // export giga payload from request body :
    const gigaPayload = req.body;
    // set the author id to connected user id :
    gigaPayload.author_id = req.user_token.id;
    // try to validate the payload :
    const { state , details } = ValidateGigaPayload( gigaPayload );
    console.log(
        details,
        state
    );
    // check the state bool :
    if (! state ){
        res.status(400).json({
            isBodyCompatible:state,
            details
        });
    }
    // try to create a new item :
    // try to save it :
    try{
        const toCreateGiga = Giga(gigaPayload);
        await toCreateGiga.save();
        res.status(201).json({ 
            message:"New Giga created !", 
            Giga: toCreateGiga 
        });
    }catch( err ){
        console.error(err);
        res.status(400).json({
            message: "Can not create new item"
        });
    }
};



module.exports = {
    getGigsController,
    createGigsController
};