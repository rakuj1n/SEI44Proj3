import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MoviePlayAndCommentPage({ user }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [comment, setComment] = useState("");
  console.log("passing", state);
  //To push user watched to db

  const movieTitle = state.state.movieDetails.title;
  const userProfilePic = user.picture;
  const username = user.name;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.length !== 0) {
      //submit comment to db!

      console.log("Submit comment", comment);
    }

    navigate("/kinolounge");
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <>
      Now playing: {movieTitle}
      {/* <video width="750" height="500" controls allowFullScreen>
        <source src={src} />
      </video> */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/C0DPdy98e4c"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <fieldset className="comment-container">
        <form onSubmit={handleSubmit}>
          <img src={userProfilePic} alt="userpic" />
          <h2>How's the movie, {username}</h2>
          <h3>You have watched {movieTitle}</h3>. Would you like to share with
          your friends?
          <input
            className="comment-box"
            value={comment}
            onChange={handleChange}
            placeholder="Would you recommend your friends to watch?"
          ></input>
          <button>Submit</button>
        </form>
      </fieldset>
    </>
  );
}
