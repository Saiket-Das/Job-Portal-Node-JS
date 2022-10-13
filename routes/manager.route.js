const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router.route("/jobs").get(
  verifyToken,
  authorization("hiring-manager"),
  managerController.getManagerSpecificJobs // Get all jobs of a specifc manager
);

router.route("/jobs/:id").get(
  verifyToken,
  authorization("hiring-manager"),
  managerController.getManagerJobById // Get job by Id of a specifc manager
);

module.exports = router;
