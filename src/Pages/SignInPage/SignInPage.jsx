import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <main>
      <h1>Sign In</h1>
      <label>
        <input name="email" placeholder="Email" />
      </label>
      <label>
        <input name="password" placeholder="Password" />
      </label>
      <br />
      <button>Sign In</button>
      <input type="checkbox" /> Remember me
      <br />
      <p>
        New to Shaw Theatres? <Link to="/signup">Sign up now.</Link>
      </p>
      <br />
      <small>
        Sign up with Shaw to enjoy updates and even connect with your friends!
      </small>
    </main>
  );
}
