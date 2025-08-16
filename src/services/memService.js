const memRepositiory=require('../repositiory/membershipRepo');
const userRepository=require('../repositiory/userRepo');
const crypto = require("crypto");
const razorpay=require("../config/razorpayConfig");

const memoRepo=new memRepositiory();
const userRepo=new userRepository();

async function createMembership(data) {
    try {
        const mem=await memoRepo.createMembership(data);
        const user=await userRepo.getUserByRollNo(mem.rollNo);
        if(!user){
            throw "user not found"
        }
        let amount =30000;
        if(!user.hasPaidJoiningFee){
            amount+=50000;
        }
        const razorpayOrder=await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: mem.rollNo
        });

        mem.orderId=razorpayOrder.id;
        
       mem.amount=amount
        await mem.save();
        return mem;
    } catch (error) {
        throw error;
    }
}

async function membershipVerification(data) {
    try {
        const sign=data.razorpayOrderId+ "|" + data.razorpayPaymentId;

        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if(expectedSignature!==data.razorpaySignature){
            throw "payment verification failed"
        }

        const membership= await memoRepo.findMembershipByOrderId(data.razorpayOrderId);
        if(!membership){
            throw "membership not found";
        }

        membership.status="approved";
        membership.paymentId=data.razorpayPaymentId;
        await membership.save();
    } catch (error) {
        throw error;
    }
}



async function findMembership() {
    try {
        const mem=memoRepo.findMembership();
        return mem;
    } catch (error) {
        throw error;
    }
}

async function findMembershipByRollNo(rollNo) {
    try {
        const mem=memoRepo.findMembershipByRollNo(rollNo);
        return mem;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createMembership,
    findMembership,
    findMembershipByRollNo,
    membershipVerification
}