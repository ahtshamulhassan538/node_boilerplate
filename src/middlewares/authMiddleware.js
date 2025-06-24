const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/apiResponseUtil");
require("dotenv").config(); // Load environment variables

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return errorResponse(res, "Access denied. No token provided.", 401);
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    // Handle expired token
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Token has expired.", 401);
    }

    // Handle other token verification errors
    return errorResponse(res, "Unauthorized access.", 401);
  }
};

module.exports = authMiddleware;
