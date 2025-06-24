const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

dotenv.config();
const app = require("./app");
const connectDB = require("./src/config/dbConfig");
const { initializeCronJobs } = require("./src/cronJobs");

const PORT = process.env.PORT || 3333;

// Connect to the database (make sure the config function connects successfully)
connectDB();

initializeCronJobs();

app.use("/", express.static(path.join(__dirname, "public")))
// Start the Express app and listen on the defined port
app
  .listen(PORT, () => console.warn(`Server running on port ${PORT}`))
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      throw err;
    }
  });
