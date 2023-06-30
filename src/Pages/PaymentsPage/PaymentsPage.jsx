import { useLocation } from "react-router-dom";

export default function PaymentsPage() {
  const { state } = useLocation();

  console.log(state);

  return (
    <main className="payment_page">
      {state === null ? (
        <>error no payments</>
      ) : (
        <>
          Payments page
          <div>
            {state.currency}
            {state.price}
          </div>
        </>
      )}
    </main>
  );
}
