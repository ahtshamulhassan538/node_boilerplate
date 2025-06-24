const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
const path = require("path");
const util = require("util");

// Promisify unlink for async file removal
const unlinkAsync = util.promisify(fs.unlink);

/**
 * ✅ Validate required AWS environment variables
 */
const requiredEnvVars = [
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_BUCKET_NAME",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

/**
 * ✅ Initialize AWS S3 client
 */
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * 📌 General Function to Upload Files
 * @param {Object} file - Multer file object
 * @param {string} uploadType - "local" or "s3"
 * @param {string} [folderPath="uploads"] - Folder path (for local) or prefix (for S3)
 * @returns {Promise<string>} - File path (local) or URL (S3)
 */
const uploadFile = async (file, uploadType = "s3", folderPath = "uploads") => {
  try {
    if (!file) throw new Error("File is required");

    /**
     * ✅ Upload File to Local Storage
     */
    if (uploadType === "local") {
      const fileName = `${Date.now()}_${file.originalname}`;
      const localPath = path.join(
        __dirname,
        `../../public/${folderPath}`,
        fileName
      );

      // Ensure the directory exists
      if (!fs.existsSync(path.dirname(localPath))) {
        fs.mkdirSync(path.dirname(localPath), { recursive: true });
      }

      await fs.promises.rename(file.path, localPath);
      return `/public/${folderPath}/${fileName}`; // Return relative path for frontend usage
    }

    /**
     * ✅ Upload File to AWS S3 using `@aws-sdk/lib-storage`
     */
    if (uploadType === "s3") {
      const s3Key = `${folderPath}/${Date.now()}_${file.originalname}`;
      const fileStream = fs.createReadStream(file.path);

      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
          Body: fileStream,
          ContentType: file.mimetype,
        },
      });

      upload.on("httpUploadProgress", (progress) => {
        console.log(`Uploading: ${progress.loaded}/${progress.total}`);
      });

      await upload.done();
      await unlinkAsync(file.path); // Remove local temp file after upload

      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
    }

    throw new Error('Invalid upload type. Use "local" or "s3"');
  } catch (error) {
    console.error("❌ File upload failed:", error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

// 📌 Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * ✅ Configure Multer for File Uploads
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(-6)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * ✅ Export Functions for External Use
 */
module.exports = { upload, uploadFile };
