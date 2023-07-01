import { useState } from "react";
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
  const navigate = useNavigate();

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
        navigate(`/mainpage/${user._id}`);
      }
    } catch {
      setNewUser({ ...newUser, errorMessage: "Sign Up Failed. Try Again." });
    }
  };

  const disable = newUser.password !== newUser.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={newUser.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            Sign Up
          </button>
        </form>
      </div>
      <p className="error-message">{newUser.errorMessage}</p>
    </div>
  );
}
