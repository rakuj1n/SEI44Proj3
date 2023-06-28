import LoginForm from "../../Components/LoginForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { useState } from "react";

export default function AuthPage({setUser}) {

  const [alreadyUser,setAlreadyUser] = useState(true)

  function handleAlreadyUser() {
    setAlreadyUser((prev) => !prev)
  }

  return (
    <main>
      <h1>AuthPage</h1>
      {alreadyUser ? 
      <LoginForm handleAlreadyUser={handleAlreadyUser} setUser={setUser}/>
      :
      <SignUpForm handleAlreadyUser={handleAlreadyUser} setUser={setUser}/> }
    </main>
  );
}
