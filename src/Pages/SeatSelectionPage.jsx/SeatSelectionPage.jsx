export default function SeatSelectionPage() {
  return (
    <>
      <h1>SeatSelectionPage</h1>
      <h3>Legend</h3>
      <div>
        <span>Available Seats</span>
      </div>
      <div>
        <span>Selected Seats</span>
      </div>
      <div>
        <span>On hold</span>
      </div>
      <div>
        <span>Unavailable Seats</span>
      </div>
      <div>
        <span>Wheel Chair Seats</span>
      </div>
      <table>
        <thead>
          <th>TYPE</th>
          <th>QUANTITY</th>
          <th>AMOUNT</th>
        </thead>
        <tbody>
          <td>Seats: </td>
          <td>Count</td>
          <td>$10</td>
        </tbody>
        <tfoot>
          <td>TOTAL</td>
          <td> </td>
          <td>$20</td>
        </tfoot>
      </table>
    </>
  );
}
