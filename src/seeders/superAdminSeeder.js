const mongoose = require("mongoose");
const connectDB = require("../config/dbConfig"); // Database connection
const { encryptPassword } = require("../helpers/generalHelper"); // Password encryption
const User = require("../models/userModel");

const seedSuperAdmin = async () => {
  try {
    // Connect to the database
    await connectDB();

    // 🔹 Step 3: Check if Super Admin User exists, if not, create it
    const existingSuperAdmin = await User.findOne({
      email: "admin@gmail.com",
    });

    if (!existingSuperAdmin) {
      const hashedPassword = await encryptPassword("Admin@12345");

      const superAdmin = await User.create({
        name: "Super Admin",
        email: "admin@edvizi.net",
        password: hashedPassword,
      });

      console.log("✅ Super Admin user created:", superAdmin);
    } else {
      console.log("⚡ Super Admin user already exists:", existingSuperAdmin);
    }
  } catch (err) {
    console.error("❌ Error seeding Super Admin:", err);
  } finally {
    // 🔹 Close the database connection
    mongoose.connection.close();
  }
};

// Run the seeder
module.exports = seedSuperAdmin;
