import { useState } from "react";
import * as usersService from "../../utilities/users-service";

export default function LogInForm({ setUser }) {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = await usersService.login(userLogin);
      setUser(user);
    } catch {
      setErrorMessage("Log In Failed. Try Again.");
    }
  }

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="email"
              value={userLogin.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={userLogin.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Sign In</button>
          <input type="checkbox" /> Remember me
        </form>
      </div>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}
