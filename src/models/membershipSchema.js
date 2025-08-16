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
        default:Date.now,
    },
    endDate:{
        type:Date,
        default: function () {
      
      return new Date(this.startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        }
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
        enum:["pending","approved","expired"],
        default:"pending"
    },
    paymentId: { type: String },
    orderId: { type: String },
    amount:{
        type:Number
    }


})

const Membership=mongoose.model("Membership",memSchema);
module.exports=Membership;