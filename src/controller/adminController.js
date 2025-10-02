const { StatusCodes } = require("http-status-codes");
const adminService=require("../services/adminServices");

async function createEntry(req,res) {
    try {
        const response=await adminService.createEntry(req.body);
        return res.status(StatusCodes.OK).json({
            message:"entry created",
            success:true,
            data:response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            error:error
        })
    }
}

module.exports={
    createEntry
}