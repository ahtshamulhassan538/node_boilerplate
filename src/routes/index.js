const express = require("express");
const userRoutes = require("../routes/userRoutes");
const rateLimiter = require("../middlewares/rateLimiterMiddleware");
const { errorResponse } = require("../utils/apiResponseUtil");
const { upload } = require("../utils/fileUploadUtil");
const userController = require("../controllers/userController");
const router = express.Router();

// Apply rate limiter globally
router.use(rateLimiter);

router.use("/users", userRoutes);

// Checking if the server is up
router.get("/status", (req, res) => {
  res.send("Server is up and running");
});

// Upload route
router.post("/upload", upload.single("file"), userController.uploadFile);
router.post("/send-email", userController.sendEmail);
router.post("/parse-csv", upload.single("file"), userController.parseCsv);

// 404 Handler: This will catch all undefined routes
router.use((req, res) => {
  return errorResponse(res, "Route not found", 404);
});

module.exports = router;
