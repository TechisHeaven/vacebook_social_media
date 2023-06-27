const jwt = require("jsonwebtoken")


const generateToken= (id)=>{

    decode =  jwt.sign(id.toJSON(), process.env.JWT_SECRET)

    return decode;
    

}


module.exports =  generateToken;