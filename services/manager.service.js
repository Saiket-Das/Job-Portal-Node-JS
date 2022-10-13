const Job = require("../models/job.model");

exports.getManagerSpecificJobsService = async (userId) => {
  const jobs = await Job.find({ "hiringManagerInfo.id": userId });
  return jobs;
};

exports.getManagerJobByIdService = async (managerEmail, jobId, res) => {
  const job = await Job.findOne({ jobId });

  if (job?.hiringManagerInfo?.email != managerEmail) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Fail",
      error: "You are not authorized.",
    });
  }

  const jobApplicants = await Job.find({ "jobInfo.id": jobId });
  return { job, jobApplicants };
};
