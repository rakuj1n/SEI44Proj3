const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/api/moviesControllers");

router.get("/", moviesController.index);

module.exports = router;
