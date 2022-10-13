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
    jobController.createNewJob // Post a New Job
  );

router
  .route("/:id")
  .get(jobController.getJobById) // Get a Job by Id
  .patch(
    verifyToken,
    authorization("hiring-manager"),
    jobController.updateJobById // Update a job
  );

router
  .route("/:id/apply")
  .post(verifyToken, authorization("candidate"), jobController.applyForAJob); // Apply for a job

router.route("/paying/highest").get(jobController.highestPaying); // Highest paying job
router.route("/paying/lowest").get(jobController.lowestPaying); // Lowest paying job

module.exports = router;
