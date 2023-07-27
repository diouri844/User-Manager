// import required models :


const { Giga } = require('../Models/Giga');
const { User } = require('../Models/User');
//const { ValideObjectId } = require("../Validations/ValidateUser");
const { ValidateGigaPayload } = require('../Validations/ValidateGiga');
// create a async handelr to get all the new gigs added from user in the same circle :

const getGigsController = async ( req, res) =>{
    const fetchresult = await Giga.find({});
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

const getGigaAuthorInfoController = async (req, res)=>{
    // extrqct the giga id from request params :
    const id = req.params.id;
    const target = await Giga.findById(id);
    if ( !target ){
        res.status(404).json({
            message: "Giga not found"
        });
    }
    // all is great : 
    const authorId = target.author_id;
    const author = await User.findById(authorId);
    if (!author) {
        res.status(404).json({
            message: "Author not found"
        });
    }
    res.status(200).json({
        message: "Success",
        Author: author
    });
};

const getMyGigsController = async ( req, res) =>{
    // get the current User id from token : 
    const userId = req.user_token.id;
    // get all the gigas of this user :
    const gigas = await Giga.find({ author_id: userId });
    res.status(200).json(
        {
            message: "Success",
            gigas
        }
    );
};


const deleteGigsController = async (req, res) => {
    const id = req.params.id;
    try{
        const target = await Giga.findByIdAndDelete(id);
        if (!target ){
            res.status(404).json({
                message: "Error",
                Giga: null
            });
        }
        res.status(200).json({
            message: "Success",
            Giga: target
        })
    }catch( err ){
        console.error(err);
        res.status(400).json({
            message: "Error"
        });
    }
};

const likeGigaController = async (req, res)=> {
    // extract the giga id from request params :
    const id = req.params.id;
    const target = await Giga.findById(id);
    if (!target ){
        res.status(404).json({
            message: "Giga not found"
        });
    }
    // update the giga likes numbers :
    target.likes = target.likes + 1;
    await target.save();
    res.status(200).json({
        message: "Success",
        Giga: target
    });
}


const dislikeGigaController = async (req,res)=> {
    // extract the giga id from request params :
    const id = req.params.id;
    const target = await Giga.findById(id);
    if (!target ){
        res.status(404).json({
            message: "Giga not found"
        });
    }
    // update the giga likes numbers :
    if (target.likes > 0) 
    {
        target.likes = target.likes - 1;
        await target.save();
    }
    res.status(200).json({
        message: "Success",
        Giga: target
    });
}



module.exports = {
    getGigsController,
    createGigsController,
    getGigaAuthorInfoController,
    getMyGigsController,
    likeGigaController,
    dislikeGigaController,
    deleteGigsController
};