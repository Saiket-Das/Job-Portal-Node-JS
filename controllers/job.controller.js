const {
  createNewJobService,
  updateJobByIdService,
} = require("../services/job.service");

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

// ---------> UPDATE A SPECIFIC JOB
exports.updateJobById = async (req, res) => {
  try {
    const job = await updateJobByIdService(
      req.user.email,
      req.params.id,
      req.body,
      res
    );

    res.status(200).json({
      status: "Success",
      message: "Successfully update a job",
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
