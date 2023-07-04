const Movie = require("../../models/api/movie");
const Account = require("../../models/api/account");


const index = async (req, res) => {
  const movies = await Movie.find();
  res.json({ movies });
};

async function addComment(req,res) {
  const userId = req.params.userId
  const movieId = req.params.movieId
  try {
    const movie = await Movie.findOne({_id:movieId})
    const userComment = movie.comments.find(item => item.userId.toString() === userId)
    if (userComment) {
      userComment.comment = req.body.comment
      userComment.rating = req.body.rating
      if (req.body.rating < 3) {
        const account = await Account.findOne({user:userId})
        account.moviesRecommended = account.moviesRecommended.filter(item => item.toString() !== movieId)
        await account.save()
      }
      await movie.save()
    } else {
      movie.comments.push({
        userId:userId,
        comment:req.body.comment,
        rating:req.body.rating
      })
      await movie.save()
    }
    if (!movie) throw new Error('No such movie.')
    res.status(200).json(movie)
  } catch (err) {
    res.status(400).json(err)
  }
}

async function fetchComment(req,res) {
  const userId = req.params.userId
  const movieId = req.params.movieId
  try {
    const movie = await Movie.findOne({_id:movieId})
    const userComment = movie.comments.find(item => item.userId.toString() === userId)
    if (!userComment) throw new Error('No comment by user yet.')
    res.status(200).json(userComment)
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  index,
  addComment,
  fetchComment
};
