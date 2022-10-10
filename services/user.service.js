const User = require("../models/user.model");

exports.signupService = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
