import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

// require("dotenv").config();
// require("./config/database");

export default function MoviePlayAndCommentPage({ user }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState('idle')
  // console.log("passing", state);
  //To push user watched to db

  const movieTitle = state.state?.movieDetails.title;
  const userProfilePic = user?.picture;
  const username = user?.name;

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await sendRequest(
          `/api/movies/comments/${user._id}/${state.state.movieDetails._id}`,
          "GET"
        )
        setRating(res.rating)
        setComment(res.comment)
      } catch (err) {
        console.log(err)
      }
    }
    fetchComments()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading')
    if (rating > 2) {
      console.log("Recommended! Rating:", rating);
      //Submit recommended
      try {
        await sendRequest(`/api/users/${user._id}/movies-recommended`, "PUT", {
          movieId: state.state.movieDetails._id,
        });
      } catch (err) {
        console.log(err);
      }
    }


    //submit comment to db!
    try {
      await sendRequest(
        `/api/movies/comments/${user._id}/${state.state.movieDetails._id}`,
        "PUT",
        { 
          comment: comment,
          rating: rating
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("Submit comment", comment);

    setStatus('success')
    navigate("/kinolounge");
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <>
      <h2>
        Back to
        <Link to="/kinolounge">
          <img
            src="https://kinolounge.shaw.sg/images/common/logo_homepage.png"
            alt="logo_homepage"
          />
        </Link>
      </h2>
      <h2>Now playing: {movieTitle}</h2>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/C0DPdy98e4c"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <fieldset className="comment-container">
        <form onSubmit={handleSubmit}>
          <img src={userProfilePic} alt="userpic" />
          <h2>How's the movie, {username}</h2>
          <h3>
            You have watched {movieTitle}. Would you like to share with your
            friends?
          </h3>
          <input
            className="comment-box"
            value={comment}
            onChange={handleChange}
            placeholder="Would you recommend your friends to watch?"
          ></input>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? "star-rating-on"
                      : "star-rating-off"
                  }
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setRating(0);
                    setHover(0);
                  }}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
          {/* <button>👍</button>
          <button>👎</button> */}
          {status === 'loading' ? <Loading /> : <button>Submit</button>}
        </form>
      </fieldset>
    </>
  );
}
