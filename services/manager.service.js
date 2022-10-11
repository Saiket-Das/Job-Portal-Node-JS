const Job = require("../models/job.model");

exports.getManagerSpecificJobsService = async (userId) => {
  const jobs = await Job.find({ userId });
  return jobs;
};
