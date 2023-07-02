const Movie = require("../../models/api/movie");

const index = async (req, res) => {
  const movies = await Movie.find();
  res.json({ movies });
};

module.exports = {
  index,
};
