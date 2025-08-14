const mongoose=require('mongoose');

const gymSchema=new mongoose.Schema({
    gymId:{
        type:Number,
        require:true,
        unique:true
    },
    name:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true
    },
    capacity:{
        type:Number,
        default:50
    },
    timeSlots: [String]
});
const Gym=mongoose.model("Gym",gymSchema);
module.exports=Gym