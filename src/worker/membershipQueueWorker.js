const { Worker } = require("bullmq");
const redis = require("ioredis");
const QRCode = require("qrcode");
const memRepositiory = require("../repositiory/membershipRepo");
const userRepository = require("../repositiory/userRepo");
const membershipQueue = require('../config/redisConfig');

const connection = new redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});
const memoRepo = new memRepositiory();
const userRepo = new userRepository();

const worker = new Worker("membershipQueue", async job => {
    if (job.name === "generateQrDaily") {
        const { membershipId } = job.data;
        const membership = await memoRepo.findMembershipById(membershipId);
        const user = await userRepo.getUserByRollNo(membership.rollNo);
        if (!membership || membership.status !== "active") return;
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const qrPayload = {
            membershipId: membership._id,
            email: user.email,
            rollNo: membership.rollNo,
            gymId: membership.gymId,
            timeSlot: membership.timeSlot,
            date: today
        };
        const qrString = JSON.stringify(qrPayload);
        const qrImage = await QRCode.toDataURL(qrString);
        membership.QRCode = qrImage;
        await membership.save();
    }
    if (job.name === "expire-membership") {
        const { membershipId } = job.data;
        const membership = await memoRepo.findMembershipById(membershipId);
        membership.status = "expired"
        await membership.save();

        await membershipQueue.removeRepeatable("generateQrDaily",  {
            repeat: {
                cron: "0 0 * * *",
                jobId: `generateQrDaily-${membership._id}`,
            }
        }
        )
        console.log("membership added to queue")
    }
},

    { connection });

worker.on("failed", (job, err) => {
    console.log(`job failed for job id ${job.id}`, err);
})
