// services/businessService.js
const { badResponse } = require("../utils/apiResponseUtil");
const sendEmail = require("../utils/sendMailUtil");
const templates = require("../emailTemplates");
const { getLoggedInUser } = require("../helpers/authHelper");
const userRepository = require("../repositories/userRepository");

class userService {
  //*****************************
  // Register function in service
  //*****************************
  async register(userData) {
    let newUser = null;
    try {
      const { username, password, email } = userData;

      // Assume we are passing the session into each operation
      const existUser = await userRepository.findUserByUsernameOrEmail(
        username,
        email
      );

      if (existUser) {
        throw new Error("User already exists");
      }

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // Create and save the new user
      newUser = await userRepository.createUser({
        username,
        email,
        password: hashPassword,
      });

      // Generating jwt token
      const token = await generateUserJwtToken(newUser);
      const refreshToken = await generateUserRefreshToken(newUser);

      newUser = newUser.toObject();
      newUser.access_token = token;
      newUser.refresh_token = refreshToken;

      return newUser;
    } catch (error) {
      // Optionally, if an error occurs, clean up created documents here
      if (newUser && newUser._id) {
        // Clean up partial save
        await userRepository.deleteUserById(newUser._id);
      }
      throw error;
    }
  }

  //***************************
  // Login function in service
  //***************************

  async loginUser(userData) {
    const { email, password } = userData;
    try {
      //Checking email
      let user = await userRepository.findByEmail(email);
      console.log("user", user);
      if (!user) {
        throw new Error("invalid credentials");
      }

      if (!user.password) {
        return badResponse("Please Create password first");
      }
      // Matching password with user password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("isMatch", isMatch);
      if (isMatch == false) {
        throw new Error("invalid credentials");
        // throw new Error("incorrect password");
      }

      if (user.status == "inactive")
        return badResponse("User is inactive, Please contact admin");

      const isAdmin = user.activeRole.name == "super-admin" ? 1 : 0;
      console.log("isAdmin", isAdmin);
      if (isAdmin) {
        // let otp = await this.sendOtp(user.email, generateOTP());
        let otp = await this.sendOtp(user.email, 3737);
        otp.isAdmin = isAdmin;
        return otp;
      }

      // Generating jwt access and refresh token
      const token = await generateUserJwtToken(user);
      const refreshToken = await generateUserRefreshToken(user);

      // user = JSON.parse(JSON.stringify(user));
      user = user.toObject();
      user.access_token = token;
      user.refresh_token = refreshToken;
      user.isAdmin = isAdmin;

      // Spread operator
      user = { ...user, password: undefined };
      return user;
    } catch (err) {
      throw err;
    }
  }

  //**************************************
  // Function to save OTP in the database
  //**************************************

  async sendOtp(email, otp) {
    try {
      const expiresAt = createExpiryTime(5); // OTP expires in 5 minutes

      // Use findOneAndUpdate with upsert to either update or insert OTP
      const result = verificationRepository.findAndUpdate(
        email,
        otp,
        expiresAt
      );

      // sending email
      const userData = {
        otp: otp,
        email: email,
      };
      await sendEmail(
        email,
        "OTP verification",
        templates["otpEmail"](otp),
        "ses"
      );

      if (result) {
        console.log("OTP saved or updated successfully.");
      } else {
        console.log("Failed to save or update OTP.");
        throw new Error("Failed to save or update OTP.");
      }
      return { email };
    } catch (err) {
      throw err;
    }
  }

  //**************************************
  // Function to get user details
  //**************************************
  async getUserDetails(data) {
    try {
      const currentUser = getLoggedInUser(data);
      const user = await userRepository.findById(currentUser.id);
      if (!user) {
        return badResponse("User not found", 404);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new userService();
