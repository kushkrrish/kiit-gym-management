const mongoose=require("mongoose");

const complaintSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"User",
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","resolved"],
        default:"pending"
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const Complaint=mongoose.model("Complaint",complaintSchema);
module.exports=Complaint