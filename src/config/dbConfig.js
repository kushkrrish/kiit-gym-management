const mongoose=require("mongoose");
const { ATLAS_DB_URL } = require("./serverConfig");

async function dbConnect() {
    try {
         const mongoUri = ATLAS_DB_URL;
    if (!mongoUri) throw new Error("MongoDB URI missing in env");
        await mongoose.connect(mongoUri);
        console.log("db connect");
    } catch (error) {
        console.log("not conected to db")
        console.log(error);

    }
}
module.exports=dbConnect