import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MoviesDetailsPage = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async (movieTitle) => {
    try {
      const response = await fetch(
        `/api/movies?title=${encodeURIComponent(movieTitle)}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.movies);
        const selectedMovie = data.movies.find(
          (movie) => movie.title === movieTitle
        );
        setMovie(selectedMovie);
      } else {
        console.error("Failed to fetch movie details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovie(title);
  }, [title]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2 className="movie-title">{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <p className="movie-description">{movie.details}</p>
      <p className="movie-actor">
        <strong>Actors:</strong> {movie.actor.join(", ")}
      </p>
      <p className="movie-director">Director: {movie.director}</p>

      <div className="comments">
        <p className="comments-heading">Comments</p>
        {movie.comments.length > 0 ? (
          <Slider {...carouselSettings}>
            {movie.comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.comment}</p>
                <p>By: {comment.userId}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No Comments Yet</p>
        )}
      </div>
    </div>
  );
};

export default MoviesDetailsPage;
