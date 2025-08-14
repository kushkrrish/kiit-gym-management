const { StatusCodes } = require("http-status-codes");
const memService=require("../services/memService");

async function createMembership(req,res) {
    try {
        const response=await memService.createMembership({
            rollNo:req.body.rollNo,
            gymId:req.body.gymId,
            timeSlot:req.body.timeSlot
        });
        return res.status(StatusCodes.CREATED).json({
            success:true,
            data:response
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            data:error
        });
    }
}

async function findMembership(req,res) {
    try {
        const response=await memService.findMembership();
        return res.status(StatusCodes.OK).json({
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

async function findMembershipByRollNo(req,res) {
    try {
        const response=await memService.findMembershipByRollNo(
            req.params.rollNo
        )
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
    createMembership,
    findMembership,findMembershipByRollNo
}