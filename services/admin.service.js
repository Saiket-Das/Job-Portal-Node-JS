const User = require("../models/user.model");

// ---------> GET ALL CANDIDATES
exports.getAllCandidatesService = async () => {
  const result = await User.find({ role: "candidate" });
  return result;
};

// ---------> GET ALL CANDIDATES
exports.getAllManagersService = async () => {
  const result = await User.find({ role: "hiring-manager" });
  return result;
};
