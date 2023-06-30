import LogInForm from "../../Components/LogInPage/LogInForm";
import { Link } from "react-router-dom";

export default function LogInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <LogInForm />
      <p>
        New to Shaw Theatres? <Link to="/register">Sign up now.</Link>
      </p>
      <br />
      <small>
        Sign up with Shaw to enjoy updates and even connect with your friends!
      </small>
    </div>
  );
}
