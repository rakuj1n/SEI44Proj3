const express = require("express");
const router = express.Router();
const moviesController = require("../../controllers/api/moviesControllers");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// "/api/movies"

router.get("/", moviesController.index);
router.put("/comments/:userId/:movieId", moviesController.addComment)
router.get("/comments/:userId/:movieId", moviesController.fetchComment)

module.exports = router;
