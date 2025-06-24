const User = require("../models/userModel");

class userRepository {
  async findOne(data) {
    return await User.findOne(data).lean();
  }

  async findMany(data) {
    return await User.find(data);
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findById(id) {
    return await User.findOne({ _id: id }).populate("activeRole");
  }

  async updateUser(id, updateData, session = null) {
    return await User.findByIdAndUpdate(id, updateData, { new: true, session });
  }

  async deleteUser(userId, businessId) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: userId,
        businessId,
      });
      if (!deletedUser) {
        return badResponse("User not found", 400);
      }
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Find user through email
  async findByEmail(email) {
    return await User.findOne({ email }).populate("activeRole");
  }

  async findById(id) {
    return await User.findOne({ _id: id }).populate("activeRole");
  }

  // Find user through email or username
  async findUserByUsernameOrEmail(username, email) {
    return await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
  }

  async createUser(userData, session = null) {
    return await User.create([userData], { session }).then((res) => res[0]);
  }

  async deleteUserById(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async update(id, updateData, session) {
    return await User.findByIdAndUpdate(id, updateData, { new: true, session });
  }

}

module.exports = new userRepository();
