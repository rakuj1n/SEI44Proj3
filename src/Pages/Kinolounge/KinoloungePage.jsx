import KinoloungeNavBar from "../../Components/KinoloungeNavbar";
import KinoCarousel from "../../Components/KinoloungeCarousel";
import FriendCard from "../../Components/FriendCard";
import { Link } from "react-router-dom";

export default function KinoloungePage() {
  return (
    <>
      <KinoloungeNavBar />
      Kinolounge page
      <KinoCarousel />
      <h2>Your friends have watched</h2>
      <FriendCard />
      <Link to="/kinolounge/movie/">MovieLink</Link>
    </>
  );
}
