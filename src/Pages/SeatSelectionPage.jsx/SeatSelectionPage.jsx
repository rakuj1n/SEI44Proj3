import SeatsLegend from "../../Components/SeatSelectionPage/SeatsLegend";
import SeatsSelection from "../../Components/SeatSelectionPage/SeatsSelection";
import TicketsTable from "../../Components/SeatSelectionPage/TicketsTable";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useState } from "react";

export default function SeatSelectionPage() {
  const [seatSelection, setSeatSelection] = useState([]);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState(0);

  function addSeats(addSeat) {
    if (seatSelection.indexOf(addSeat) === -1) {
      setSeatSelection([...seatSelection, addSeat]);
      setQty(qty + 1);
      setAmount((qty + 1) * 10);
    }
    return;
  }

  console.log(seatSelection);

  function removeSeats(removeSeat) {
    const updatedSeatSelection = seatSelection.filter(
      (seat) => seat !== removeSeat
    );

    setSeatSelection(updatedSeatSelection);
    setQty(qty - 1);
    setAmount((qty - 1) * 10);
  }

  function handleReset() {
    setSeatSelection([]);
    setQty(0);
    setAmount(0);
  }

  function handleConfirmedSeats() {
    return;
  }

  return (
    <Container maxWidth="ml">
      <Stack spacing={0}>
        <SeatsSelection addSeats={addSeats} removeSeats={removeSeats} />
        <SeatsLegend />
        <TicketsTable seatSelection={seatSelection} qty={qty} amount={amount} />
      </Stack>
      <button onClick={handleReset}>RESET</button>
      <button onClick={handleConfirmedSeats}>CONFIRM SEAT(S)</button>
    </Container>
  );
}
