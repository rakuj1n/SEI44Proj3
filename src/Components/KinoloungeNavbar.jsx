import { Link } from "react-router-dom";

export default function KinoloungeNavBar() {
  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <Link to="/kinolounge">SFS Picks</Link>
            </li>
            <li>
              <Link to="/kinolounge">Le French Cinema</Link>
            </li>
            <li>
              <Link to="/kinolounge">Shaw Showcase</Link>
            </li>
            <li>
              <Link to="/kinolounge">P Ramlee Classic Films</Link>
            </li>
            <li>
              <Link to="/kinolounge">Friend's recommendations</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
