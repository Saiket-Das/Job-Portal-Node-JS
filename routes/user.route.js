const express = require("express");
const userController = require("../controllers/user.controller");
// const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router
  .route("/admin/:id")
  .patch(verifyToken, authorization("admin"), userController.makeAdmin);

// router.get("/me", verifyToken, userController.getMe);

module.exports = router;
