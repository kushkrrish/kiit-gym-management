const { StatusCodes } = require("http-status-codes");
const gymService=require("../services/gymService");
async function createGym(req,res) {
    try {
        const response=await gymService.createGym({
            gymId:req.body.gymId,
            name:req.body.name,
            location:req.body.location,
            capacity:req.body.capacity,
            timeSlots:req.body.timeSlots

        });
        return res.status(StatusCodes.CREATED).json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            error:error
        })
    }
}

async function findGym(req,res) {
    try {
        const response=await gymService.findGym();
        return res.status(StatusCodes.OK).json({
            success:true,
            data:response
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            error:error
        })
    }
}

module.exports={
    createGym,
    findGym
}