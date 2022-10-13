const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/candidates")
  .patch(verifyToken, authorization("admin"), adminController.getAllCandidates);

// router
//   .route("/assignManager/:id")
//   .patch(verifyToken, authorization("admin"), userController.assignManager);

// router.get("/me", verifyToken, userController.getMe);

module.exports = router;
