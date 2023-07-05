import { useEffect, useState } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import IconButton from "@mui/material/IconButton";

export default function Seats({
  seats,
  addSeats,
  removeSeats,
  reset,
  occupiedSeats,
}) {
  const [active, setActive] = useState(false);

  function handleSeat(event) {
    setActive(!active);

    !active
      ? addSeats(event.currentTarget.value)
      : removeSeats(event.currentTarget.value);
  }

  useEffect(() => {
    setActive(false);
  }, [reset]);

  const disabled = occupiedSeats.includes(seats);

  return (
    <IconButton
      value={seats}
      onClick={handleSeat}
      disabled={disabled}
      size="small"
    >
      <EventSeatIcon
        sx={{ color: active ? "yellow" : disabled ? "gray" : "white" }}
      />
    </IconButton>
  );
}
