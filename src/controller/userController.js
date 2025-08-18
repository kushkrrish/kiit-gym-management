const { StatusCodes } = require("http-status-codes")
const userService=require("../services/userService")
async function createUser(req,res) {
    console.log("inside control")
    try {
        const newUser=await userService.createUser({
            role:req.body.role,
            name:req.body.name,
            rollNo:req.body.rollNo,
            email:req.body.email,
            password:req.body.password

        })
        return res.status(StatusCodes.OK).json({
            success:true,
            data:newUser
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            error:error
        })
    }
}
async function signin(req,res) {
    try {
        const user=await userService.signin({
            // name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
        })
        return res.status(StatusCodes.OK).json({
            success:true,
            data:user
        })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            error:error
        })
    }
}


module.exports={
    createUser,
    signin
}