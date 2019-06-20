const listController = require("../controllers/listController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/:id([0-9]+)", passport.authenticate("jwt", { session: false }), listController.get);
router.get("/all", passport.authenticate("jwt", { session: false }), listController.getAll);
router.post("/create", passport.authenticate("jwt", { session: false }), listController.create);
router.post("/:id/update", passport.authenticate("jwt", { session: false }), listController.update);
router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), listController.delete);

module.exports = router;
