const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router
  .route("/candidates")
  .get(verifyToken, authorization("admin"), adminController.getAllCandidates);

router
  .route("/managers")
  .get(verifyToken, authorization("admin"), adminController.getAllManagers);

//   router
//   .route("/candidate/:id")
//   .get(verifyToken, authorization("admin"), adminController.getCand);

module.exports = router;
