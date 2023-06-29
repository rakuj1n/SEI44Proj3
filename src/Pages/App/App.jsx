import { useState } from "react";
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../utilities/users-service";
import KinoloungePage from "../Kinolounge/KinoloungePage";
import PlayMoviePage from "../PlayMoviePage/PlayMoviePage";

export default function App() {
  // const [user, setUser] = useState(getUser());
  const [user, setUser] = useState("Hi");

  return (
    <main className="App">
      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/kinolounge" element={<KinoloungePage />} />
            {/* To add /:movieId */}
            <Route path="/kinolounge/movie" element={<PlayMoviePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
