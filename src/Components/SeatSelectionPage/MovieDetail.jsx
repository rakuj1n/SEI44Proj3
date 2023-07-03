import Container from "@mui/material/Container";

export default function MovieDetail({ movieTitle, moviePoster }) {
  return (
    <Container maxWidth="ml">
      <div className="detailsContainer">
        <div className="detailsImg">
          <img src={moviePoster} alt={movieTitle} height={"180px"} />
        </div>
        <div>
          <h1>{movieTitle}</h1>
        </div>
      </div>
    </Container>
  );
}
