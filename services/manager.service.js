const Job = require("../models/job.model");

exports.getManagerSpecificJobsService = async (userId) => {
  const jobs = await Job.find({ "hiringManagerInfo.id": userId });
  return jobs;
};
