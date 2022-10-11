const {
  getManagerSpecificJobsService,
} = require("../services/manager.service");

// ---------> GET ALL JOBS OF A MANAGER
exports.getManagerSpecificJobs = async (req, res) => {
  try {
    console.log(req.user);
    const job = await getManagerSpecificJobsService(req.user.id);

    res.status(200).json({
      status: "Success",
      message: "Successfully get all jobs",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};
