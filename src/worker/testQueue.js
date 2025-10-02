const { Queue, QueueEvents } = require("bullmq");

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const membershipQueue = new Queue("membershipQueue", { connection });
const queueEvents = new QueueEvents("membershipQueue", { connection });

async function runTest() {
  const membershipId = "test123";

  // 🔹 1. Add a one-time job (runs immediately)
  const oneTimeJob = await membershipQueue.add(
    "generateQrDaily",
    { membershipId },
    {
      removeOnComplete: true,
      removeOnFail: false,
    }
  );

  console.log("🚀 One-time job added:", oneTimeJob.id);

  // ✅ Wait for the one-time job to finish
  try {
    const result = await oneTimeJob.waitUntilFinished(queueEvents);
    console.log("✅ One-time job finished with result:", result);
  } catch (err) {
    console.error("❌ One-time job failed:", err);
  }

  // 🔹 2. Add a repeatable job (every 1 minute)
  await membershipQueue.add(
    "generateQrDaily",
    { membershipId },
    {
      repeat: {
        cron: "*/1 * * * *", // every 1 min
      },
      jobId: `generateQrDaily-${membershipId}`,
    }
  );

  console.log("⏳ Repeatable job scheduled (runs every 1 min)");
}

runTest().catch(err => {
  console.error("❌ Error in test script:", err);
  process.exit(1);
});
