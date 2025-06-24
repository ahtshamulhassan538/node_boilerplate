const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
