const {
  getAllCandidatesService,
  getAllManagersService,
} = require("../services/admin.service");

// ---------> GET ALL CANDIDATES
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await getAllCandidatesService();

    res.status(200).json({
      status: "Success",
      message: "Successfully get all candidates",
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ---------> GET ALL MANAGERS
exports.getAllManagers = async (req, res) => {
  try {
    const candidates = await getAllManagersService();

    res.status(200).json({
      status: "Success",
      message: "Successfully get all candidates",
      data: candidates,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};
