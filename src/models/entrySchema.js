const mongoose = require("mongoose");

const entrySchema= new mongoose.Schema({
    membershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Membership",
        required: true
    },
    userEmail: {
        type: String,
        require: true
    },
    rollNo: {
        type: String,
        require: true
    },
    timeSlot: {
        type: String,
        require: true
    },
    gymId: {
        type: Number,
        ref: "Gym", 
        required: true
    },
    date:{
        type:String,
        require:true
    },
    timeOfScan:{
        type:Date,
        default:Date.now()
    }

});

const Entry= mongoose.model("Entry",entrySchema);
module.exports=Entry;