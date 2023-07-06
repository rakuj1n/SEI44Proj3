import { useEffect, useState } from "react";
import "./App.css";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../utilities/users-service";
import MainPage from "../../Components/MainPage/MainPage";
import MyFriendsPage from "../MyFriendsPage.jsx/MyFriendsPage";
import AccountPage from "../AccountPage/AccountPage";
import Settings from "../../Components/AccountPage/Settings";
import Profile from "../../Components/AccountPage/Profile";
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
import PromotionsPage from "../../Components/PromotionPage/PromotionsPage";
import PromotionDetailsPage from "../../Components/PromotionPage/PromotionDetailsPage";
import TicketConfirmationPage from "../TicketConfirmationPage/TicketConfirmationPage";
import MainPageStanding from "../../Components/MainPage/MainPageStanding";
import LogInPage from "../LogInPage/LogInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import AccountFollowing from "../../Components/AccountPage/AccountFollowing";
import EditComment from "../../Components/AccountPage/EditComment";
import sendRequest from "../../utilities/send-request"


export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isUserLoggedIn = !!user;
  const isRootPath = window.location.pathname === "/";
  const [picChanged,setPicChanged] = useState(false)
  const [profilePic,setProfilePic] = useState('')

  useEffect(() => {
    const loggedInUser = getUser();
    setUser(loggedInUser);

    if (!loggedInUser && isRootPath) {
      navigate("/");
    }
  }, [isRootPath, navigate]);

  useEffect(() => {
    console.log('picchanged')
    async function getAccount() {
      try {
        const account = await sendRequest(`/api/users/${user._id}`, "GET");
        setProfilePic(account.user.picture)
      } catch (err) {
        console.log(err);
      }
    }
    getAccount();
  },[picChanged,user])

  return (
    <main className="App">
      {isUserLoggedIn && <Navbar user={user} setUser={setUser} profilePic={profilePic} />}
      <Routes>
        <Route path="/" element={<MainPageStanding />} />
        {isUserLoggedIn && (
          <>
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
                element={<Settings user={user} setPicChanged={setPicChanged} />}
              />
              <Route
                path="/users/:userId/following"
                element={<AccountFollowing user={user} />}
              />
              <Route path="/users/:userId" element={<Profile user={user} />} />
              <Route
                path="/users/:userId/:movieId/editcomment"
                element={<EditComment user={user} />}
              />
            </Route>
            <Route
              path="/kinolounge"
              element={<KinoloungePage user={user} />}
            />
            <Route
              path="/kinolounge/:movieId/comments"
              element={<MoviePlayAndCommentPage user={user} profilePic={profilePic} />}
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
              element={<SeatSelectionPage user={user} />}
            />
            <Route
              path="/movies/:title"
              element={<MoviesDetailsPage user={user} />}
            />
            <Route
              path="/movies/:title/ticket-confirmation"
              element={<TicketConfirmationPage user={user} />}
            />
            <Route path="/checkout" element={<CheckoutPage user={user} />} />
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
            <Route path='/*' element={<h1>404 Page Not Found.</h1>} />
          </>
        )}
      </Routes>
      {!isUserLoggedIn && !isRootPath && (
        <AuthPage setUser={setUser}>
          <Routes>
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </AuthPage>
      )}
    </main>
  );
}
