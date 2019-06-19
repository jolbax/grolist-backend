const itemController = require("../controllers/itemController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/:listId/items/:id", itemController.get);
router.get("/:listId/items/all", itemController.getAll);
router.post("/:listId/items/create", itemController.create);
router.post("/:listId/items/:id/update", itemController.update);
router.delete("/:listId/items/:id/delete", itemController.delete);

module.exports = router;
