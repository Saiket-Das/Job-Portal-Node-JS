const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/")
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
// router
//   .route("/assignManager/:id")
//   .patch(verifyToken, authorization("admin"), jobController.assignManager);

// router.get("/me", verifyToken, jobController.getMe);

module.exports = router;
