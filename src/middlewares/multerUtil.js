const multer = require("multer");
const path = require("path");

// Set storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

// Define allowed MIME types
const allowedMimeTypes = [
    "text/csv",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/gif"
];

// File filter for CSV and image files
const fileFilter = (req, file, cb) => {
    console.log("File MIME type:", file.mimetype);
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only CSV and image files are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;