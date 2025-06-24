const seedSuperAdmin = require("./superAdminSeeder");

const seedAll = async () => {
  try {
    console.log("Seeding super admin...");
    await seedSuperAdmin(); // Wait for super admin to seed
    console.log("Super admin seeded successfully.");

    //Add all other seeders here
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1); // Exit with error
  }
};

seedAll();
