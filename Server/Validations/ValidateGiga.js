const ValidateGigaPayload = ( giga_target )=>{
    if ( ! giga_target.hasOwnProperty('author_id') ){
        return {
            state : false ,
            details: { 
                autor_id:"Author is required"
            }
        };
    };
    if( ! giga_target.hasOwnProperty('title') ){
        return {
            state : false ,
            details: { 
                title:"Title is required"
            }
        };
    }
    if ( !giga_target.hasOwnProperty('area') ){
        return {
            state : false ,
            details: { 
                area:"Giga area is required"
            }
        };
    }
    if ( !giga_target.hasOwnProperty('body') ){
        return {
            state : false ,
            details: { 
                body:"Giga content is required"
            }
        };
    }
    if ( !giga_target.hasOwnProperty('haseImg') ){
        return {
            state : false ,
            details: { 
                haseImg:"please select if your giga hase a media , is required :) "
            }
        };
    }
    if ( giga_target.haseImg && !giga_target.hasOwnProperty('imgUrl')){
        return {
            state : false ,
            details: { 
                imgUrl:"please set img url  or set haseImg prop to false , is required :) "
            }
        };
    }
    return {
        state:true,
        details:{}
    }
};


module.exports = {
    ValidateGigaPayload
}