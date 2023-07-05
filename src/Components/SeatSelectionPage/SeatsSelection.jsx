import Container from "@mui/material/Container";
import Seats from "./Seats";
import { useState, useEffect } from "react";
import Loading from "../Loading";

export default function SeatsSelection({
  addSeats,
  removeSeats,
  reset,
  occupiedSeats,
}) {
  const [loading, setLoading] = useState(true);
  const [seatings, setSeatings] = useState([]);
  const [rowLabels, setRowLabels] = useState([]);

  useEffect(() => {
    async function getSeatings() {
      setLoading(true);
      const response = await fetch(`/api/seats`);
      const jsonData = await response.json();
      setSeatings(jsonData);

      const labelRes = await fetch("/api/seats/rowLabels");
      const labelData = await labelRes.json();
      setRowLabels(labelData);
      setLoading(false);
    }
    getSeatings();
  }, []);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <Container maxWidth="ml">
      <div className="seatsSelector">
        <div align="center">
          <div className="seatSelectionTitle">SEATS</div>
          <div className="seatSelectionContainer">
            <div className="screen"></div>
            <div className="screenText">Screen</div>
            <div className="seatingContainer">
              <div className="seatRowContainer">
                {seatings.map((seating, index) => {
                  return (
                    <div className="seatsRow" key={index}>
                      {seating.map((seats) => {
                        return (
                          <div name={seats} key={seats}>
                            <Seats
                              key={seats}
                              seats={seats}
                              addSeats={addSeats}
                              removeSeats={removeSeats}
                              reset={reset}
                              occupiedSeats={occupiedSeats}
                            />
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
