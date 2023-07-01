import SeatsLegend from "../../Components/SeatSelectionPage/SeatsLegend";
import TicketsTable from "../../Components/SeatSelectionPage/TicketsTable";
import Stack from "@mui/material/Stack";

export default function SeatSelectionPage() {
  return (
    <>
      <h1>SeatSelectionPage</h1>
      <Stack spacing={0}>
        <SeatsLegend />
        <TicketsTable />
      </Stack>

      <button>RESET</button>
      <button>CONFIRM SEAT(S)</button>
    </>
  );
}
