import { useState } from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";

export default function Seats({ seats }) {
  const [active, setActive] = useState(false);
  const seatSelection = [];

  function handleSeat(event) {
    setActive(!active);
    seatSelection.push(event.target.name);
  }

  console.log(seatSelection);

  return (
    <div name={seats} onClick={handleSeat}>
      <EventSeatIcon sx={{ color: active ? "yellow" : "white" }}>
        {seats}
      </EventSeatIcon>
    </div>
  );
}
