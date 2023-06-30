import { useState } from "react";
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../utilities/users-service";
import MainPage from "../MainPage/MainPage";
import MyFriendsPage from "../MyFriendsPage.jsx/MyFriendsPage";
import AccountPage from "../AccountPage/AccountPage";
import Settings from "../../Components/AccountPage/Settings";
import Profile from "../../Components/AccountPage/Profile";
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
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/users/:userId/friends" element={<MyFriendsPage />} />
            <Route path="/users/:userId" element={<AccountPage user={user} />}>
              <Route
                path="/users/:userId/settings"
                element={<Settings user={user} />}
              />
              <Route path="/users/:userId" element={<Profile user={user} />} />
            </Route>
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
