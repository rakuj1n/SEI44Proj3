const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/api/moviesControllers");

// "/api/movies"

router.get("/", moviesController.index);
router.put("/comments/:userId/:movieId", moviesController.addComment)

module.exports = router;
