import Container from "@mui/material/Container";
import Seats from "./Seats";

export default function SeatsSelection() {
  const seatings = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8"],
  ];

  const rowLabels = ["A", "B", "C", "D", "E"];

  return (
    <Container maxWidth="ml">
      <div className="seatsSelector">
        <div align="center">
          <div className="seatSelectionTitle">SEATS</div>
          <div className="seatSelectionContainer">
            <div className="screen"></div>
            <div className="screenText">Screen</div>
            <div className="seatRowContainer">
              <div>
                {seatings.map((seating, index) => {
                  return (
                    <div className="seatsRow" key={index}>
                      {seating.map((seats) => {
                        return (
                          <div name={seats} key={seats}>
                            <Seats key={seats} seats={seats} />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="rowLabels">
                {rowLabels.map((label) => {
                  return (
                    <div key={label}>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
