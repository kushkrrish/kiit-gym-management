const mongoose=require("mongoose");
const { ATLAS_DB_URL } = require("./serverConfig");

async function dbConnect() {
    try {
        await mongoose.connect(ATLAS_DB_URL);
        console.log("db connect");
    } catch (error) {
        console.log("not conected to db")
        console.log(error);

    }
}
module.exports=dbConnect