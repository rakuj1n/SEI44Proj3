import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";

export default function TicketsTable({ seatSelection, qty, amount }) {
  return (
    <Container maxWidth="ml">
      <TableContainer className="tableContainer">
        <Table aria-label="Tickets Table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottomColor: "lightgray",
                  color: "lightgray",
                }}
              >
                TYPE
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottomColor: "lightgray",
                  color: "lightgray",
                }}
                align="right"
              >
                QUANTITY
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottomColor: "lightgray",
                  color: "lightgray",
                }}
                align="right"
              >
                AMOUNT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  borderBottomColor: "lightgray",
                  maxWidth: "200px",
                }}
              >
                Seats: {seatSelection.join(", ")}
                <br />
                <span className="ticketPricing">Adult $10.00</span>
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottomColor: "lightgray" }}
                align="right"
              >
                {qty}
              </TableCell>
              <TableCell
                sx={{ color: "white", borderBottomColor: "lightgray" }}
                align="right"
              >
                ${Number(amount).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  color: "white",
                }}
              >
                TOTAL
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  color: "white",
                }}
                align="right"
              ></TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  borderBottom: "none",
                  color: "white",
                }}
                align="right"
              >
                ${Number(amount).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
