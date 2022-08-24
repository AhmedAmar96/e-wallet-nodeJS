const mongoose = require("mongoose");

const dbConnection = async ()=>{
    mongoose.connect(process.env.MONGO_CONNECTION_ATLAS)
    .then((result)=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("error connecting ==> ", err);
    })
}
 
module.exports = dbConnection; 