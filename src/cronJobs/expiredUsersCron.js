
async function expiriedUsers() {
  try {
    //Process Your Logic here
    console.warn("Expired users cron us working");
  } catch (error) {
    console.error("Unexpected error in expirigTaskCron:", error);
    return {
      success: false,
      message: "Unexpected error occurred.",
      error: "error",
    };
  }
}

module.exports = expiriedUsers;
