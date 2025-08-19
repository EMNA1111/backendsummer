const mongoose = require("mongoose")

module.exports.connecttoMongoDB = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.Url_Mongo).then(()=>{console.log("connect to db")}
).catch(
    (error)=>{console.log(error)}
  )
}




//username:emna6
//mdp:ViWD4Vwf3RU9Irax
