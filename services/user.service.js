const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  console.log(user);
  return user;
};

exports.makeAdminService = async (id) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { role: "admin" } },
    { runValidators: true }
  );
  return result;
};
