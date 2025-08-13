const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["student","admin"],
        default:"student",
        
    },
    name:{
        type:String,
        require:[true,"name cant be empty"]
    },
    rollNo:{
        type:String,
        require:[true,"roll no cant be empty"],
       
    },
    email:{
        type:String,
        unique:true,
        require:[true,"email cant be empty"],
        
    },
    password:{
        type:String,
        require:[true,"cant be empty"]
    },
    hasPaidJoiningFee: { type: Boolean, default: false },


    
});
userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
    console.log(this.password)
    next();
});

const User=mongoose.model("User",userSchema);
module.exports=User