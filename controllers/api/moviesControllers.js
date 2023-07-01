const Movie = require("../../models/api/movie");

const index = async (req, res) => {
  const { title } = req.query;
  const movies = await Movie.find({ title });
  res.json({ movies });
};

module.exports = {
  index,
};
