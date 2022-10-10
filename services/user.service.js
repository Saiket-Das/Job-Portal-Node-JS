const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

exports.assignAdminService = async (id) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { role: "admin" } },
    { runValidators: true }
  );
  return result;
};

exports.assignManagerService = async (id) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { role: "hiring-manager" } },
    { runValidators: true }
  );
  return result;
};
