const mongoose = require("mongoose")

module.exports.connecttoMongoDB = async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.Url_Mongo).then(()=>{console.log("connect to db")}
).catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
//username:emna6
//mdp:6KFJFI1M56oyTnTE
