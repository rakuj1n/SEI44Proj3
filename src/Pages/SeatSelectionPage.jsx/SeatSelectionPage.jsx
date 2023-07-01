import SeatLegend from "../../Components/SeatSelectionPage/SeatLegend";
import TicketsTable from "../../Components/SeatSelectionPage/TicketsTable";
import Stack from "@mui/material/Stack";

export default function SeatSelectionPage() {
  return (
    <>
      <h1>SeatSelectionPage</h1>
      <Stack spacing={0}>
        <SeatLegend />
        <TicketsTable />
      </Stack>

      <button>RESET</button>
      <button>CONFIRM SEAT(S)</button>
    </>
  );
}
