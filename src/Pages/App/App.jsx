import { useState } from "react";
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../utilities/users-service";
import MainPage from "../../Components/MainPage/MainPage";
import MyFriendsPage from "../MyFriendsPage.jsx/MyFriendsPage";
import AccountPage from "../AccountPage/AccountPage";
import Settings from "../../Components/AccountPage/Settings";
import Profile from "../../Components/AccountPage/Profile";
import LogInPage from "../LogInPage/LogInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import KinoloungePage from "../Kinolounge/KinoloungePage";
import PlayMoviePage from "../PlayMoviePage/PlayMoviePage";
import SFSPicksPage from "../Kinolounge/SFSPicksPage";
import LeFrenchCinema from "../Kinolounge/LeFrenchCinemaPage";
import ShawShowcasePage from "../Kinolounge/ShawShowcase";
import PRamleeClassicFilmsPage from "../Kinolounge/PRamleeClassicFilmsPage";
import MoviesPage from "../../Components/MoviesPage/MoviesPage";
import SeatSelectionPage from "../SeatSelectionPage.jsx/SeatSelectionPage";
import MoviesDetailsPage from "../../Components/MoviesPage/MoviesDetailsPage";
import MoviePlayAndCommentPage from "../MoviePlayAndCommentPage.jsx/MoviePlayAndCommentPage";
import CheckoutPage from "../CheckoutPage/Checkout";
import TicketConfirmationPage from "../NewOrderPage/TicketConfirmationPage/TicketConfirmationPage";
import PromotionsPage from "../../Components/PromotionPage/PromotionsPage";
import PromotionDetailsPage from "../../Components/PromotionPage/PromotionDetailsPage";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/mainpage" element={<MainPage user={user} />} />
            <Route
              path="/users/:userId/friends"
              element={<MyFriendsPage user={user} />}
            />
            <Route path="/users/:userId" element={<AccountPage user={user} />}>
              <Route
                path="/users/:userId/settings"
                element={<Settings user={user} />}
              />
              <Route path="/users/:userId" element={<Profile user={user} />} />
            </Route>
            <Route
              path="/kinolounge"
              element={<KinoloungePage user={user} />}
            />
            {/* To add /:movieId */}
            <Route
              path="/kinolounge/:movieId/comments"
              element={<MoviePlayAndCommentPage user={user} />}
            />
            <Route
              path="/kinolounge/:movieId"
              element={<PlayMoviePage user={user} />}
            />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route
              path="/promotions/:title"
              element={<PromotionDetailsPage />}
            />
            <Route
              path="/movies/:title/seat-selection"
              element={<SeatSelectionPage />}
            />
            <Route path="/movies/:title" element={<MoviesDetailsPage />} />
            <Route
              path="/movies/:title/ticket-confirmation"
              element={<TicketConfirmationPage user={user} />}
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route>
              {/* <Route path="/kinolounge/movie" element={<PlayMoviePage user={user}/>} /> */}
              <Route path="kinolounge/page/sfs" element={<SFSPicksPage />} />
              <Route
                path="kinolounge/page/le-french-cinema"
                element={<LeFrenchCinema />}
              />
              <Route
                path="kinolounge/page/shaw-showcase"
                element={<ShawShowcasePage />}
              />
              <Route
                path="kinolounge/page/p-ramlee-classic"
                element={<PRamleeClassicFilmsPage />}
              />
            </Route>
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser}>
          <Route path="/" element={<LogInPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </AuthPage>
      )}
    </main>
  );
}
