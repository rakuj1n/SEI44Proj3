// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const MovieDetailsPage = () => {
//   const { title } = useParams();
//   const [movie, setMovie] = useState(null);

//   // Fetch movie details data from the server
//   useEffect(() => {
//     // Make an API call to fetch movie details based on the title
//     // Replace the API_URL with your actual API endpoint
//     fetch(`${API_URL}/movies/${title}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMovie(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching movie details:", error);
//       });
//   }, [title]);

//   if (!movie) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{movie.title}</h2>
//       <img src={movie.poster} alt={movie.title} />
//       <p>{movie.details}</p>
//       <p>Director: {movie.director}</p>
//       <p>Actors: {movie.actor.join(", ")}</p>
//     </div>
//   );
// };

// export default MovieDetailsPage;
