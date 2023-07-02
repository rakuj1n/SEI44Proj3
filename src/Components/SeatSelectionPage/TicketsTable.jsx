import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

export default function TicketsTable() {
  return (
    <Container maxWidth="ml">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tickets Table">
          <TableHead>
            <TableRow>
              <TableCell align="left">TYPE</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">Seats: Adult $10.00</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">$20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">TOTAL</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">$20</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

//     <table>
//       <thead>
//         <th>TYPE</th>
//         <th>QUANTITY</th>
//         <th>AMOUNT</th>
//       </thead>
//       <tbody>
//         <td>Seats: </td>
//         <td>Count</td>
//         <td>$10</td>
//       </tbody>
//       <tfoot>
//         <td>TOTAL</td>
//         <td> </td>
//         <td>$20</td>
//       </tfoot>
//     </table>
//   );
// }
