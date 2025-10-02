const { Queue } = require("bullmq");
const IORedis = require("ioredis");

// ⚡ Use same Redis connection as in your app
const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379
});

// Membership Queue
const membershipQueue = new Queue("membershipQueue", { connection });

async function inspectQueue() {
  console.log("=== Queue Inspector ===");

  // 1. Delayed Jobs (expire-membership)
  const delayed = await membershipQueue.getDelayed();
  console.log(`\n🔴 Delayed (expire-membership) jobs: ${delayed.length}`);
  delayed.forEach(job => {
    console.log({
      id: job.id,
      name: job.name,
      membershipId: job.data.membershipId,
      delayMs: job.opts.delay,
      timestamp: job.timestamp,
      processAt: new Date(job.timestamp + job.opts.delay).toISOString()
    });
  });

  // 2. Repeatable Jobs (generateQrDaily)
  const repeatables = await membershipQueue.getRepeatableJobs();
  console.log(`\n🔁 Repeatable (generateQrDaily) jobs: ${repeatables.length}`);
  repeatables.forEach(job => {
    console.log({
      key: job.key,
      name: job.name,
      nextRunAt: new Date(job.next).toISOString(),
      every: job.every
    });
  });

  // 3. Active Jobs
  const active = await membershipQueue.getActive();
  console.log(`\n🟡 Active jobs: ${active.length}`);
  active.forEach(job => console.log({ id: job.id, name: job.name }));

  // 4. Completed Jobs (last 5)
  const completed = await membershipQueue.getCompleted(0, 5);
  console.log(`\n✅ Recently completed jobs: ${completed.length}`);
  completed.forEach(job => console.log({ id: job.id, name: job.name }));
  
  console.log("\n=== End Inspector ===\n");
}

inspectQueue().then(() => process.exit(0));
