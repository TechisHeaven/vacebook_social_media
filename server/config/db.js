const mongoose = require("mongoose");

const ConnectDB = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://0.0.0.0:27017/vacebook')
        console.log(`Connected to Mongo - ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit()
    }
}



module.exports = ConnectDB;