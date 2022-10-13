const User = require("../models/user.model");

// ---------> GET A JOB BY ID
exports.getAllCandidatesService = async (jobId) => {
  const result = await User.find({});
  return result;
};
