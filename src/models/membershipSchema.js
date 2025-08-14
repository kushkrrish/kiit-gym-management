const mongoose=require('mongoose');

const memSchema=new mongoose.Schema({
    rollNo:{
        type:String,
        ref:"User",
        require:true
    },
    gymId:{
        type:Number,
        ref:"Gym",
        require:true
    },
    startDate:{
        type:Date,
        require:true,
    },
    endDate:{
        type:Date,
        require:true,
    },
    timeSlot: {
        type: String, 
        required: true
    },
    isActive: { 
        type: Boolean, 
        default: false
    },
    status:{
        type:String,
        enum:["pending","approved"],
        default:"pending"
    }

})

const Membership=mongoose.model("Membership",memSchema);
module.exports=Membership;