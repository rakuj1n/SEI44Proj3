import { useState } from "react";
import KinoloungeNavBar from "../../Components/KinoloungeNavbar";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayMoviePage() {
  const navigate = useNavigate();
  const [ownsMovie, setOwnsMovie] = useState(true);
  //   const movieId=useParams();
  const handleClick = () => {
    console.log("Return click");

    navigate("/kinolounge");
  };

  return (
    <>
      <>play/rent movie page</>;
      <KinoloungeNavBar />
      <div className="PlayRentPageContainer">
        <img src="https://picsum.photos/id/237/200/300" alt="pic" />
        <p>Title</p>
        <button>{ownsMovie ? "Play" : "Rent"}</button>
      </div>
      <div>MAIN CAST</div>
      <div>DIRECTOR</div>
      <div>LANGUAGE</div>
      <button onClick={handleClick} className="return">
        Cancel
      </button>
    </>
  );
}
