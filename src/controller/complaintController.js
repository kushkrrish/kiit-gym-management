const { StatusCodes } = require("http-status-codes");
const complaintService=require("../services/complaintService");


async function createComplaint(req,res) {
    try {
        const response=await complaintService.createComplaint({
            userId:req.body.userId,
            description:req.body.description
        })
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

async function findComplaintByRollNO(req,res) {
    try {
        const response=await complaintService.findComplaintByRollNO(req.params.rollNo);
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

async function findComplaints(req,res) {
    try {
        const response=await complaintService.findComplaints();
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

async function complaintResolve(req,res) {
    try {
        const response=await complaintService.complaintResolve({
            complaintId:req.body.complaintId,
            status:req.body.status
        })
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
    createComplaint,
    findComplaintByRollNO,
    findComplaints,
    complaintResolve
}

