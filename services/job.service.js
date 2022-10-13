const Apply = require("../models/apply.model");
const Job = require("../models/job.model");

// ---------> GET ALL JOB
exports.getJobsService = async (filter, queries) => {
  const result = await Job.find(filter)
    .select(queries.fields)
    .sort(queries.sortBy)
    .skip(queries.skip)
    .limit(queries.limit);
  const jobs = await Job.countDocuments(filter);
  const pageCount = Math.ceil(Job / queries.limit);
  return { pageCount, jobs, result };
};

// ---------> GET A JOB BY ID
exports.getJobByIdService = async (jobId) => {
  const result = await Job.findById(jobId).populate("hiringManagerInfo");
  return result;
};

// ---------> CREATE A NEW JOB
exports.createNewJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};

// ---------> UPDATE A SPECIFIC JOB
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

// ---------> HIGHEST PAYING JOBS
exports.highestPayingervice = async () => {
  const result = await Job.find({}).sort({ salaryRange: 1 }).limit(2);
  return result;
};
