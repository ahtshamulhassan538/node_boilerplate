// middlewares/rateLimiter.js
const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 300, // limit each IP to 100 requests per windowMs
  message: {
    status: false,
    statusCode: 429,
    message: "Too many requests, please try again in a minute.",
  },
  standardHeaders: true, // includes RateLimit-* headers
  legacyHeaders: false,  // disables the deprecated X-RateLimit-* headers
  keyGenerator: (req) => req.ip, // ensure rate limit is IP based
  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = rateLimiter;
