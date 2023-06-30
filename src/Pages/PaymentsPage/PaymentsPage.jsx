import { useLocation } from "react-router-dom";

export default function PaymentsPage() {
  const { state } = useLocation();
  console.log(state);

  return (
    <>
      Payments page
      <div>
        {state.currency}
        {state.price}
      </div>
    </>
  );
}
