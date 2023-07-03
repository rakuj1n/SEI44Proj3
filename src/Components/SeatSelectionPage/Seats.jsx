import { useState } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import IconButton from "@mui/material/IconButton";

export default function Seats({ seats, addSeats, removeSeats }) {
  const [active, setActive] = useState(false);

  function handleSeat(event) {
    setActive(!active);

    !active
      ? addSeats(event.currentTarget.value)
      : removeSeats(event.currentTarget.value);

    console.log(event.currentTarget.value);
  }

  return (
    <IconButton value={seats} onClick={handleSeat} size="small">
      <EventSeatIcon sx={{ color: active ? "yellow" : "white" }} />
    </IconButton>
  );
}
