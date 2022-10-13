const User = require("../models/user.model");
const Apply = require("../models/apply.model");

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

// ---------> GET ALL CANDIDATES
exports.getCandidateDeatilsByIdService = async (userId) => {
  const candidateDetails = await User.findById(userId);

  const appliedJobs = await Apply.find(
    { "candidateInfo.id": userId },
    { candidateInfo: 0 }
  );

  return { candidateDetails, appliedJobs };
};
