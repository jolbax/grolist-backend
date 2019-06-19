const userController = require("../controllers/userController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/create", userController.create);
router.post("/log_in", userController.apiLogin);
router.put(
  "/:id([0-9]+)/reset_password",
  passport.authenticate("jwt", { session: false }),
  userController.resetPassword
);

module.exports = router;
