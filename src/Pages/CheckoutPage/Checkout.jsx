import { useLocation, useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function CheckoutPage({ user }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("user", user._id);
  console.log("CheckoutSTate", state?.movieId);

  const handleCheckout = async () => {
    console.log("CheckoutMovie", state?.movieId);

    try {
      await sendRequest(`/api/users/${user._id}/movies-rented`, "PUT", {
        movieId: state.movieId,
      });
    } catch (err) {
      console.log(err);
    }
    navigate(`/kinolounge/`);
  };

  return (
    <main className="payment_page">
      {state === null ? (
        <h1 className="checkout-container">No payments found!</h1>
      ) : (
        <>
          {/* Checkout page */}
          <div className="checkout-container">
            <img src={state.poster} alt={state.movieTitle} img width="10%" />
            <div>
              {state.movieTitle} at {state.currency}
              {state.price}
            </div>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </main>
  );
}
