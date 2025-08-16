const memRepositiory = require('../repositiory/membershipRepo');
const userRepository = require('../repositiory/userRepo');
const crypto = require("crypto");
const {Queue,Worker}=require("bullmq");
const redis=require("ioredis");

const connection =new redis({
     host: "127.0.0.1", 
  port: 6379,
  maxRetriesPerRequest: null,
});

const razorpay = require("../config/razorpayConfig");
const membershipQueue = require('../config/redisConfig');

const memoRepo = new memRepositiory();
const userRepo = new userRepository();

async function createMembership(data) {
    try {
        const mem = await memoRepo.createMembership(data);
        const user = await userRepo.getUserByRollNo(mem.rollNo);
        if (!user) {
            throw "user not found"
        }
        let amount = 30000;
        if (!user.hasPaidJoiningFee) {
            amount += 50000;
        }
        const razorpayOrder = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: mem.rollNo
        });

        mem.orderId = razorpayOrder.id;

        mem.amount = amount
        await mem.save();
        return mem;
    } catch (error) {
        throw error;
    }
}
async function membershipVerification(data) {
    try {
        const sign = data.razorpayOrderId + "|" + data.razorpayPaymentId;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature !== data.razorpaySignature) {
            throw "payment verification failed"
        }

        const membership = await memoRepo.findMembershipByOrderId(data.razorpayOrderId);
        if (!membership) {
            throw "membership not found";
        }
        const now = new Date();
        const expiry = new Date();
        expiry.setDate(now.getDate() + 30);
        membership.status = "approved";
        membership.startDate = now;
        membership.endDate = expiry;
        membership.paymentId = data.razorpayPaymentId;
        await membership.save();
        //consume after 30 days
        await membershipQueue.add("expire-membership", { membershipId: membership._id }, { delay: 30 * 24 * 60 * 60 * 1000 }) // 30 days)
        console.log("membership added to queue")
    } catch (error) {
        throw error;
    }
}
async function findMembership() {
    try {
        const mem = memoRepo.findMembership();
        return mem;
    } catch (error) {
        throw error;
    }
}
async function findMembershipByRollNo(rollNo) {
    try {
        const mem = memoRepo.findMembershipByRollNo(rollNo);
        return mem;
    } catch (error) {
        throw error;
    }
}

const worker=new Worker("membershipQueue",
    async job=>{
        if(job.name==="expire-membership"){
            const {membershipId}=job.data;
            const membership=await memoRepo.findMembershipById(membershipId);
            membership.status="expired"
            await membership.save();
            console.log("membership added to queue")
        }
    },
    {connection}
);
worker.on("failed",(job,err)=>{
    console.log(`job failed for job id ${job.id}`,err);
})
module.exports = {
    createMembership,
    findMembership,
    findMembershipByRollNo,
    membershipVerification
}