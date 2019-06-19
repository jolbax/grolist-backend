const listController = require("../controllers/listController");
const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/:id([0-9]+)", listController.get);
router.get("/all", listController.getAll);
router.post("/create", listController.create);
router.post("/:id/update", listController.update);
router.delete("/:id/delete", listController.delete);

module.exports = router;
