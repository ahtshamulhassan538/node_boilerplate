const userService = require("../services/userService");
const {
  successResponse,
  exceptionResponse,
  errorResponse,
} = require("../utils/apiResponseUtil");
const { uploadFile } = require("../utils/fileUploadUtil");
const sendEmail = require("../utils/sendMailUtil");
const emailTemplates = require("../emailTemplates");
const parseCSV = require("../utils/CsvParserUtil");

class userController {
  //*********************************
  // Register function in controller
  //*********************************

  async register(req, res) {
    try {
      // Register the user with session passed
      const user = await userService.register(req);

      return successResponse(
        res,
        user,
        LangUtil.getMessage("en", "SUCCESSFULL_REGISTERATION"),
        201
      );
    } catch (error) {
      return exceptionResponse(res, error);
    }
  }

  //*********************************
  // Login function in controller
  //*********************************
  async login(req, res) {
    try {
      //  Checking password and logiing in the user
      const user = await userService.loginUser(req.body);

      if (user.error) {
        return errorResponse(res, user.error, user.statusCode);
      }

      return successResponse(
        res,
        user,
        LangUtil.getMessage("en", "SUCCESSFULL_LOGIN")
      );
    } catch (error) {
      return exceptionResponse(res, error);
    }
  }

  //**************************************
  // Controller Function to upload file
  //**************************************
  async uploadFile(req, res) {
    try {
      if (!req.file) {
        return errorResponse(res, "File is required", 400);
      }

      // Determine storage type (local or S3)
      const uploadType = req.body.uploadType || "local"; //  local or s3
      const folderPath = req.body.folderPath || "uploads"; // Default folder

      // Upload file using the uploadFile function
      const fileUrl = await uploadFile(req.file, uploadType, folderPath);
      return successResponse(res, fileUrl, "File uploaded successfully");
    } catch (err) {
      return exceptionResponse(res, err);
    }
  }

  //**************************************
  // Controller Function to send email
  //**************************************
  async sendEmail(req, res) {
    try {
      await sendEmail(
        "test@gmail.com", //reciever email
        "Your Email Subject",
        emailTemplates.otpEmailTemplate(
          "3737", //OTP
          "User" //username
        ),
        "mailtrap"
      );
      return successResponse(res, null, "Email 4 successfully");
    } catch (error) {
      return exceptionResponse(res, error);
    }
  }

  //**************************************
  // Controller Function to parse CSV
  //**************************************
  async parseCsv(req, res) {
    if (!req.file) {
      return errorResponse(res, "File is required", 400);
    }
    try {
      const data = await parseCSV(req.file.path);
      return successResponse(res, data, "CSV data retrieved successfully");
    } catch (error) {
      return exceptionResponse(res, error);
    }
  }
}

module.exports = new userController();
