const express = require("express");
const router = express.Router();
const advertController = require("../controllers/advertController");

router.get("/advertisements", advertController.index);
router.get("/advertisements/new", advertController.new);
router.post("/advertisements/create", advertController.create);

module.exports = router;