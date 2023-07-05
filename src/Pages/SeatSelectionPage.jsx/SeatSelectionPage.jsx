import SeatsLegend from "../../Components/SeatSelectionPage/SeatsLegend";
import SeatsSelection from "../../Components/SeatSelectionPage/SeatsSelection";
import TicketsTable from "../../Components/SeatSelectionPage/TicketsTable";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieDetail from "../../Components/SeatSelectionPage/MovieDetail";
import sendRequest from "../../utilities/send-request";
import Loading from "../../Components/Loading";

export default function SeatSelectionPage({ user }) {
  const [loading, setLoading] = useState(true);
  const [seatSelection, setSeatSelection] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState(0);
  const [reset, setReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { title, movieId } = useParams();

  useEffect(() => {
    async function retrieveTickets() {
      setLoading(true);
      const response = await fetch(`/api/tickets/${movieId}`);
      const jsonData = await response.json();

      let takenSeats = [];
      for (let i = 0; i < jsonData.retrievedTickets.length; i++) {
        jsonData.retrievedTickets[i].seats.map((seat) => takenSeats.push(seat));
      }

      setOccupiedSeats(takenSeats);
      setLoading(false);
    }
    retrieveTickets();
  }, []);

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
    setReset(!reset);
    setSeatSelection([]);
    setQty(0);
    setAmount(0);
  }

  async function handleConfirmedSeats() {
    try {
      await sendRequest("/api/tickets", "POST", {
        movie: location.state.movieId,
        bookingUser: user._id,
        seats: seatSelection,
      });
    } catch (err) {
      setErrorMessage("Ticket Purchase Failed. Try Again.");
    }

    navigate(`/movies/${title}/ticket-confirmation/${movieId}`, {
      state: {
        qty: qty,
        movieTitle: location.state.movieTitle,
        moviePoster: location.state.moviePoster,
        theatre: location.state.theatre,
        timing: location.state.timing,
      },
    });
  }

  if (loading === true) {
    return <Loading />;
  }

  const disabled = qty === 0;

  return (
    <Container maxWidth="ml">
      <Stack spacing={0}>
        <MovieDetail
          movieTitle={location.state.movieTitle}
          moviePoster={location.state.moviePoster}
          theatre={location.state.theatre}
          timing={location.state.timing}
        />
        <SeatsSelection
          addSeats={addSeats}
          removeSeats={removeSeats}
          reset={reset}
          occupiedSeats={occupiedSeats}
        />
        <SeatsLegend />
        <TicketsTable seatSelection={seatSelection} qty={qty} amount={amount} />
      </Stack>
      <button onClick={handleReset} disabled={disabled}>
        RESET
      </button>
      <button onClick={handleConfirmedSeats} disabled={disabled}>
        CONFIRM SEAT(S)
      </button>
      <br />
      <span>{errorMessage}</span>
      <br />
    </Container>
  );
}
