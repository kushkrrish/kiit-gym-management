const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["student","admin"],
        default:"student",
        require:true
        
    },
    name:{
        type:String,
        require:[true,"name cant be empty"]
    },
    rollNo:{
        type:String,
        // require:[true,"roll no cant be empty"],
        validate: {
      validator: function (v) {
        return this.role !== "student" || (v && v.length > 0);
      },
      message: "rollNo is required for students"
    }

       
    },
    email:{
        type:String,
        unique:true,
        require:[true,"email cant be empty"],
        
    },
    employeeId:{
        type:String,
        // require:true,
       validate: {
      validator: function (v) {
        return this.role !== "admin" || (v && v.length > 0);
      },
      message: "employeeId is required for admins"
    }
    },
    password:{
        type:String,
        require:[true,"cant be empty"]
    },
    
    hasPaidJoiningFee: { type: Boolean, default: false },
    membershipId:{
        type:String
    }


    
});
userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10);
    console.log(this.password)
    next();
});

const User=mongoose.model("User",userSchema);
module.exports=User