import AccessibleIcon from "@mui/icons-material/Accessible";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Container from "@mui/material/Container";

export default function SeatLegend() {
  return (
    <Container maxWidth="ml">
      <div className="seatLegendContainer">
        <div className="legendHeader">
          <h4>Legend</h4>
        </div>
        <div className="seatLegend">
          <div>
            <div>
              <EventSeatIcon sx={{ color: "white" }} />
            </div>
            <span>Available Seats</span>
          </div>
          <div>
            <div>
              <EventSeatIcon sx={{ color: "yellow" }} />
            </div>
            <span>Selected Seats</span>
          </div>
          <div>
            <div>
              <EventSeatIcon color="success" />
            </div>
            <span>On hold</span>
          </div>
          <div>
            <div>
              <EventSeatIcon sx={{ color: "grey" }} />
            </div>
            <span>Unavailable Seats</span>
          </div>
          <div>
            <div>
              <AccessibleIcon color="primary" />
            </div>
            <span>Wheel Chair Seats</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
