const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/")
  .get(jobController.getJobs) // Get all Jobs
  .post(
    verifyToken,
    authorization("hiring-manager"),
    jobController.createNewJob //Post a New Job
  );

router.route("/:id").get(jobController.getJobById).patch(
  verifyToken,
  authorization("hiring-manager"),
  jobController.updateJobById //Update a job
);

module.exports = router;
