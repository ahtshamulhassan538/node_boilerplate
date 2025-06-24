// generic-cron.js
const cron = require("node-cron");
const cronJobs = []; // Store active cron jobs

// Generic Cron Manager
class CronManagerUtil {
  // Register a new cron job
  static registerCronJob({
    name,
    schedule,
    taskLogic,
    params = {},
    enabled = true,
  }) {
    if (!name || !schedule || !taskLogic) {
      throw new Error(
        "Missing required parameters: name, schedule, or taskLogic"
      );
    }

    if (!cron.validate(schedule)) {
      throw new Error(`Invalid cron schedule: ${schedule}`);
    }

    if (!enabled) {
      console.info(`Cron job ${name} is disabled`);
      return;
    }

    // Create the cron job
    const job = cron.schedule(
      schedule,
      async () => {
        try {
          console.info(`Running cron job: ${name}`);
          // Execute the task logic with provided params
          await taskLogic(params);
          console.success(`Cron job ${name} completed successfully`);
        } catch (error) {
          console.error(`Error in cron job ${name}: ${error.message}`);
        }
      },
      {
        scheduled: true,
      }
    );

    // Store the job for reference
    cronJobs.push({ name, job });
    console.success(`Cron job ${name} registered with schedule ${schedule}`);
  }

  // Stop a specific cron job
  static stopCronJob(name) {
    const jobInfo = cronJobs.find((job) => job.name === name);
    if (jobInfo) {
      jobInfo.job.stop();
      console.error(`Cron job ${name} stopped`);
    } else {
      console.warn(`Cron job ${name} not found`);
    }
  }

  // Stop all cron jobs
  static stopAllCronJobs() {
    cronJobs.forEach(({ name, job }) => {
      job.stop();
      console.error(`Cron job ${name} stopped`);
    });
    cronJobs.length = 0; // Clear the array
  }
}

module.exports = CronManagerUtil;
