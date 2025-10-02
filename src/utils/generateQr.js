const QRCode = require("qrcode");
const memRepositiory = require("../repositiory/membershipRepo");
const userRepository = require("../repositiory/userRepo");
const memoRepo = new memRepositiory();
const userRepo = new userRepository();
// const QRCode = require("qrcode");
const redis = require("ioredis");
const redisClient = new redis({
   host: "127.0.0.1",
   port: 6379,
   maxRetriesPerRequest: null,
});


async function generareQr(data) {
   try {
      // const { membershipId } = data;
      // console.log(data);
      const membership = await memoRepo.findMembershipById(data);
      console.log(membership);
      const user = await userRepo.getUserByRollNo(membership.rollNo);
      console.log("user:", user);
      // if (!membership || membership.status !== "approved") return;
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const qrPayload = {
         membershipId: data,
         email: user.email,
         rollNo: membership.rollNo,
         gymId: membership.gymId,
         timeSlot: membership.timeSlot,
         date: today
      };
      const qrString = JSON.stringify(qrPayload);
      const qrImage = await QRCode.toDataURL(qrString);
      // console.log(qrImage);
      await memoRepo.updateMembership(data, { QRCode: qrImage });
      await redisClient.set(`qr:${membership._id}`, qrImage);

   } catch (error) {
      console.log(error)
   }

   
}
module.exports = generareQr