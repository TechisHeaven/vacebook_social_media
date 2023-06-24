const jwt = require("jsonwebtoken")


const generateToken= (id)=>{

    decode =  jwt.sign(id.toJSON(), "vacebook")

    return decode;
    

}


module.exports =  generateToken;