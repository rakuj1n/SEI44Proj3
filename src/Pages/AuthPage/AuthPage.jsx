import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LogInPage from "../LogInPage/LogInPage";
import SignUpPage from "../SignUpPage/SignUpPage";

export default function AuthPage({ setUser }) {
  const [alreadyUser, setAlreadyUser] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/register") {
      setAlreadyUser(false);
    } else {
      setAlreadyUser(true);
    }
  }, [location]);

  return (
    <main>
      {alreadyUser ? (
        <LogInPage setUser={setUser} />
      ) : (
        <SignUpPage setUser={setUser} />
      )}
    </main>
  );
}
