const { StatusCodes } = require("http-status-codes");
const memService=require("../services/memService");
const crypto = require("crypto");
// const {  RAZORPAY_KEY_SECRET } = require("../config/serverConfig");

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

async function membershipVerification(req,res) {
    try {
        //mimic the payment verification for testing
        const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET )
        .update(req.body.razorpayOrderId + "|" + req.body.razorpayPaymentId)
        .digest("hex");
        console.log(generated_signature.toString());
        const response=await memService.membershipVerification({
            razorpayOrderId:req.body.razorpayOrderId,
            razorpayPaymentId:req.body.razorpayPaymentId,
            razorpaySignature:generated_signature.toString()
        })

        return res.status(StatusCodes.OK).json({
            success:true,
            msg:"payment successfull",
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
    createMembership,
    findMembership,findMembershipByRollNo,
    membershipVerification
}