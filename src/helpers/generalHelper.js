const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // Make sure to require the 'crypto' module

class generalHelper {
  // Convert a string to ObjectId
  static convertToObjectid(value) {
    return new mongoose.Types.ObjectId(value);
  }

  // Check if a value is a valid ObjectId
  static checkObjectid(value) {
    return mongoose.Types.ObjectId.isValid(value);
  }

  // Generate encrypted password
  static async encryptPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // Generate a random 6-digit OTP
  static generateOTP() {
    return crypto.randomInt(1000, 9999).toString();
  }

  static createExpiryTime(value) {
    return new Date(Date.now() + value * 60 * 1000);
  }

  static getOtpChunk(otp, index) {
    otp = String(otp); // Ensure otp is a string

    if (index < 1 || index > otp.length) {
      throw new Error("Index out of range");
    }
    return otp.charAt(index - 1); // Convert 1-based index to 0-based
  }
}

module.exports = generalHelper;
