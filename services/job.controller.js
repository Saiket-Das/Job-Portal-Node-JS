const Job = require("../models/job.model");

exports.createNewJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};
