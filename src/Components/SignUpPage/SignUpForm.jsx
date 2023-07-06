import { useEffect, useState } from "react";
import { signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ setUser }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    errorMessage: "",
  });
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (newUser.password !== newUser.confirm) {
      setPwErrorMessage("Password and Confirm Password do not match.");
    } else {
      setPwErrorMessage("");
    }
  }, [newUser.password, newUser.confirm]);

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
      error: "",
    });
    console.log(newUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = { ...newUser };
      delete formData.errorMessage;
      delete formData.confirm;
      const user = await signUp(formData);
      setUser(user);

      if (user) {
        navigate("/mainpage");
      }
    } catch {
      setNewUser({ ...newUser, errorMessage: "Sign Up Failed. Try Again." });
    }
  };

  const disable = newUser.password !== newUser.confirm;

  return (
    <div>
      <div className="signUpForm">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="input"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="input"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            className="input"
            value={newUser.confirm}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit" disabled={disable}>
            Sign Up
          </button>
        </form>
      </div>
      <br />
      <p className="error-message">
        {disable ? pwErrorMessage : newUser.errorMessage}
      </p>
    </div>
  );
}
