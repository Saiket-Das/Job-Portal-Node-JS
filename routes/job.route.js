const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/")
  .get(jobController.getJobs)
  .post(
    verifyToken,
    authorization("hiring-manager"),
    jobController.createNewJob
  );

router
  .route("/:id")
  .patch(
    verifyToken,
    authorization("hiring-manager"),
    jobController.updateJobById
  );

// router.get("/me", verifyToken, jobController.getMe);

module.exports = router;
