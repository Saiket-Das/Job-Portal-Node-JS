const Job = require("../models/job.model");

exports.createNewJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};

exports.updateJobByIdService = async (
  managerEmail,
  jobId,
  updatedInfo,
  res
) => {
  const manager = await Job.findOne({ jobId });

  if (manager?.hiringManagerInfo?.email != managerEmail) {
    return res.status(403).json({
      status: "Forbidden",
      message: "Fail",
      error: "You are not authorized to update this job",
    });
  }

  const job = await Job.updateOne(
    { _id: jobId },
    { $set: updatedInfo },
    {
      runValidators: true,
    }
  );
  return job;
};