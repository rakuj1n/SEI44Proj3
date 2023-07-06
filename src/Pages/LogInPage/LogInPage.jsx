import LogInForm from "../../Components/LogInPage/LogInForm";
import { Link } from "react-router-dom";

export default function LogInPage({ setUser }) {
  return (
    <div className="loginContainer">
      <div className="shawImages">
        <img
          src="https://www.pngkey.com/png/detail/107-1071221_in-may-2011-after-a-seven-month-and.png"
          alt="shawLogo"
        />
        <img
          src="https://finestservices.com.sg/wordpress/wp-content/uploads/2022/11/kinolounge_logo.png"
          alt="kinoloungeLogo"
        />
      </div>
      <div className="login">
        <h1>Sign In</h1>
        <LogInForm setUser={setUser} />
        <div className="signUpDetails">
          <p>
            New to Shaw Theatres? <Link to="/register">Sign up now.</Link>
          </p>
          <small>
            Sign up with Shaw to enjoy updates and even connect with your
            friends!
          </small>
        </div>
      </div>
    </div>
  );
}
