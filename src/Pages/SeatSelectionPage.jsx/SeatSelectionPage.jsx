import SeatsLegend from "../../Components/SeatSelectionPage/SeatsLegend";
import SeatsSelection from "../../Components/SeatSelectionPage/SeatsSelection";
import TicketsTable from "../../Components/SeatSelectionPage/TicketsTable";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

export default function SeatSelectionPage() {
  return (
    <Container maxWidth="ml">
      <h1>SeatSelectionPage</h1>
      <Stack spacing={0}>
        <SeatsSelection />
        <SeatsLegend />
        <TicketsTable />
      </Stack>
      <button>RESET</button>
      <button>CONFIRM SEAT(S)</button>
    </Container>
  );
}
