import SignUpForm from "../../Components/SignUpPage/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUpPage({ setUser }) {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm setUser={setUser} />
      <p>
        Already a Shaw Theatres member? <Link to="/">Sign in now.</Link>
      </p>
    </div>
  );
}
