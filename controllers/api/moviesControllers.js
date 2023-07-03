const Movie = require("../../models/api/movie");

const index = async (req, res) => {
  const movies = await Movie.find();
  res.json({ movies });
};

async function addComment(req,res) {
  const userId = req.params.userId
  const movieId = req.params.movieId
  try {
    const movie = await Movie.findOneAndUpdate({_id:movieId},{$push:{comments:{userId:userId,comment:req.body.comment}}})
    if (!movie) throw new Error('No such movie.')
    res.status(200).json(movie)
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  index,
  addComment
};
