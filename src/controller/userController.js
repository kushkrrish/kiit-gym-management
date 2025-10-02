const { StatusCodes } = require("http-status-codes")
const userService=require("../services/userService")
async function createUser(req,res) {
    console.log("inside control")
    
    try {
        console.log(req.body.employeeId);
        const newUser=await userService.createUser({
            role:req.body.role,
            name:req.body.name,
            rollNo:req.body.rollNo,
            email:req.body.email,
            employeeId:req.body.employeeId,
            password:req.body.password,
           

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
async function findUserByEmail(req,res) {
    try {
        const response=await userService.findUserByEmail(req.params.emailId);
        console.log(response);
        return res.status(StatusCodes.OK).json({
            success:true,
            data:response
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
    signin,
    findUserByEmail
}