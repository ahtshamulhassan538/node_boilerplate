// cron/cronJobs.js
const CronManager = require("../utils/cronManagerUtil");
const expiriedUsers = require("./expiredUsersCron");


function initializeCronJobs() {
  // Define all cron jobs here
  const cronJobs = [
    {
      name: "expirigUsers",
      schedule: "* * * * *", // Run every minute
      taskLogic: expiriedUsers,
      params: {
        thresholdHours: 24, // Notify for deadlines within 24 hours
      },
      enabled: true,
    },
    // Add more cron jobs as needed
  ];

  // Register all cron jobs
  cronJobs.forEach((job) => {
    try {
      CronManager.registerCronJob(job);
    } catch (error) {
      console.error(
        `Failed to register cron job ${job.name}: ${error.message}`
      );
    }
  });
}

module.exports = { initializeCronJobs };
