const {
  getJobsService,
  createNewJobService,
  updateJobByIdService,
  getJobByIdService,
} = require("../services/job.service");

// ---------> GET ALL JOB
exports.getJobs = async (req, res) => {
  try {
    const filter = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];

    // Deleting [Sort, Page, Limit] Queries
    excludeFields.forEach((field) => delete filter[field]);

    const queries = {};

    // ----> SELETED FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    // ----> SORT BY
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    // ----> PAGINATION
    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }
    const jobs = await getJobsService(filter, queries);

    res.status(200).json({
      status: "success",
      message: "Successfully get all jobs",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};

// ---------> GET A JOB BY ID
exports.getJobById = async (req, res) => {
  try {
    const jobs = await getJobByIdService(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Successfully get all jobs",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: " Internal server error",
      error: error.message,
    });
  }
};

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
