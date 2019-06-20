const itemController = require("../controllers/itemController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/:listId/items/:id", passport.authenticate("jwt", { session: false }),itemController.get);
router.get("/:listId/items/all", passport.authenticate("jwt", { session: false }),itemController.getAll);
router.post("/:listId/items/create", passport.authenticate("jwt", { session: false }),itemController.create);
router.post("/:listId/items/:id/update", passport.authenticate("jwt", { session: false }),itemController.update);
router.delete("/:listId/items/:id/delete", passport.authenticate("jwt", { session: false }),itemController.delete);

module.exports = router;
