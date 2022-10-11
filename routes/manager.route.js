const express = require("express");
const router = express.Router();
const managerController = require("../controllers/manager.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/jobs")
  .get(
    verifyToken,
    authorization("hiring-manager"),
    managerController.getManagerSpecificJobs
  );

module.exports = router;
