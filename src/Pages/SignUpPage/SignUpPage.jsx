import SignUpForm from "../../Components/SignUpPage/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPage({ setUser }) {
  return (
    <div className="signUpContainer">
      <h1>Sign Up</h1>
      <SignUpForm setUser={setUser} />
      <div className="signInDetails">
        <p>
          Already a Shaw Theatres member? <Link to="/login">Sign in now.</Link>
        </p>
        <small>
          Sign up with Shaw to enjoy updates and even connect with your friends!
        </small>
      </div>
    </div>
  );
}
