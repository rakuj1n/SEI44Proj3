import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { state } = useLocation();

  console.log(state);

  return (
    <main className="payment_page">
      {state === null ? (
        <>error no payments</>
      ) : (
        <>
          Payment page
          <div>
            <img src={state.poster} alt={state.movieTitle} img width="10%" />
            <div>
              {state.movieTitle} at {state.currency}
              {state.price}
            </div>
          </div>
          <button>Checkout</button>
        </>
      )}
    </main>
  );
}
