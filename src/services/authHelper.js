const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/apiResponseUtil");
require("dotenv").config();

/**************************
 * Get current token user
 **************************/
exports.getCurrentUser = (token) => {
  try {
    if (!token) {
      throw new Error("Token is required");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    throw new Error("Invalid or expired token");
  }
};

/**************************
 * Get current token
 **************************/
exports.getTokenFromRequest = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  return token;
};

//***************************
// Function to generate the access token
//***************************
exports.generateUserJwtToken = async (user) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      activeRole: user.activeRole.name,
      businessId: user.businessId ?? undefined,
    },
  };

  let $token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
  return $token;
};

//***************************
// Function to generate the refresh token
//***************************
exports.generateUserRefreshToken = async (user) => {
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      activeRole: user.activeRole.name,
      businessId: user.businessId ?? undefined,
    },
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
  return refreshToken;
};

//***************************
// Function to generate both tokens
//***************************
exports.generateTokens = (user) => {
  const accessToken = this.generateUserJwtToken(user);
  const refreshToken = this.generateUserRefreshToken(user);

  return { accessToken, refreshToken };
};

//***************************
// Function to get Logged in User
//***************************
exports.getLoggedInUser = (req) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>;
  // 2. Verify and decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded.user; // Assuming user details are stored in 'user' payload
};
