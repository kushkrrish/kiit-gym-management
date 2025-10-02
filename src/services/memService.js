const memRepositiory = require('../repositiory/membershipRepo');
const userRepository = require('../repositiory/userRepo');
const crypto = require("crypto");


const razorpay = require("../config/razorpayConfig");
const membershipQueue = require('../config/redisConfig');
const generareQr = require('../utils/generateQr');

const memoRepo = new memRepositiory();
const userRepo = new userRepository();

async function createMembership(data) {
    try {
        //pending
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
// chkout
async function membershipVerification(data) {
    try {
        const sign = data.razorpay_order_id + "|" + data.razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature !== data.razorpay_signature) {
            throw "payment verification failed"
        }

        const membership = await memoRepo.findMembershipByOrderId(data.razorpay_order_id);
        const user = await userRepo.getUserByRollNo(membership.rollNo);
        if (!membership) {
            throw "membership not found";
        }
        const now = new Date();
        const expiry = new Date();
        expiry.setDate(now.getDate() + 30);
        membership.status = "approved";
        membership.startDate = now;
        membership.endDate = expiry;
        membership.paymentId = data.razorpay_payment_id;
        await membership.save();
        user.hasPaidJoiningFee = true;
        user.membershipId = membership._id
        await user.save()

        await generareQr(membership._id);
        //consume after 30 days
        await membershipQueue.add(
            "expire-membership",
            { membershipId: membership._id },
            {
                delay: 30 * 24 * 60 * 60 * 1000, // 30 days
                jobId: `expire-${membership._id}`, // unique job id
                removeOnComplete: true,
                removeOnFail: false,
            }
        );

        console.log("membership added to queue")
        await membershipQueue.add(
            "generateQrDaily",
            { membershipId: membership._id },
            {
                repeat: {
                    cron: "0 0 * * *", // every day at midnight
                },
                jobId: `generateQrDaily-${membership._id}`, // must be outside repeat
            }
        );

        await membership.save();
        
    } catch (error) {
        console.log(error)
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
async function findMembershipById(data) {
    try {
        const mem = memoRepo.findMembershipById(data);
        return mem;
    } catch (error) {
        console.log(error)
        throw error;
    }
}


module.exports = {
    createMembership,
    findMembership,
    findMembershipByRollNo,
    membershipVerification,
    findMembershipById
}

