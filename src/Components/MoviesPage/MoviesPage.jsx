const express = require("express");
const router = express.Router();
const Movie = require("../../../models/api/movie");

// GET /api/movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET /api/movies/:title
router.get("/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const movie = await Movie.findOne({ title });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
