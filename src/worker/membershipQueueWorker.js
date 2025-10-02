require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
console.log("ATLAS_DB_URL from env:", process.env.ATLAS_DB_URL);
const { Worker, QueueEvents } = require("bullmq");
const Redis = require("ioredis");
const dbConnect = require("../config/dbConfig");
const memRepositiory = require("../repositiory/membershipRepo");
const generareQr = require("../utils/generateQr");
const membershipQueue = require("../config/redisConfig");

(async () => {
  console.log("ATLAS_DB_URL from env:", process.env.ATLAS_DB_URL); // debug
  await dbConnect();

  const connection = new Redis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
  });

  const memoRepo = new memRepositiory();

  const worker = new Worker(
    "membershipQueue",
    async (job) => {
      try {
        if (job.name === "generateQrDaily") {
          console.log("Processing job:", job.name, "data:", job.data);
          await generareQr(job.data.membershipId);
          return { status: "qr-generated", membershipId: job.data.membershipId };
        }

        if (job.name === "expire-membership") {
          const { membershipId } = job.data;
          const membership = await memoRepo.findMembershipById(membershipId);
          membership.status = "expired";
          await membership.save();

            await membershipQueue.removeRepeatable("generateQrDaily", {
        cron: "0 0 * * *",
        jobId: `generateQrDaily-${membership._id}`,
      });
          console.log("membership expired:", membershipId);
          return { status: "expired", membershipId };
        }
      } catch (error) {
        console.log("error from worker:", error);
        throw error;
      }
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.log(`job failed for job id ${job.id}`, err);
  });

  const queueEvents = new QueueEvents("membershipQueue", { connection });
  queueEvents.on("completed", ({ jobId, returnvalue }) => {
    console.log(`Job ${jobId} completed with result:`, returnvalue);
  });
  queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.log(`Job ${jobId} failed with error:`, failedReason);
  });
})();
