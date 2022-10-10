const { createNewJobService } = require("../services/job.controller");

// ---------> CREATE A NEW JOB
exports.createNewJob = async (req, res) => {
  try {
    const job = await createNewJobService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully post a job",
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
