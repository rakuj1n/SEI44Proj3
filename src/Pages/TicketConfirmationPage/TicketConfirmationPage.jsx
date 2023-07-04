import { useLocation } from "react-router-dom";
import MovieDetail from "../../Components/SeatSelectionPage/MovieDetail";

export default function TicketConfirmationPage({ user }) {
  const location = useLocation();

  return (
    <div className="ticketConfirmation">
      <h1>Ticket Booking has been Confirmed!</h1>
      <p>
        Hi {user.name}, Thank you for your purchase! We look forward to seeing
        you in the cinema.
      </p>
      <br />
      <h2>Booking Details</h2>
      <MovieDetail
        movieTitle={location.state.movieTitle}
        moviePoster={location.state.moviePoster}
        theatre={location.state.theatre}
        timing={location.state.timing}
      />
      <br />
      <h2>You have booked ({location.state.qty}) Tickets</h2>
      <br />
      <hr />
      <br />
      <h2>Terms and Conditions</h2>
      <p>
        By submission of payment, you have agreed to our terms and conditions.
        Full terms and conditions, please click here. We wish to highlight the
        following:
      </p>
      <p className="bold">No refunds, cancellation or exchanges.</p>
      <p className="ticketInfo">
        ** Kindly note that no refunds, cancellations or exchanges will be
        entertained even if the tickets are not collected at the box office.
        Please quote booking reference number or your email address with your
        contact number that you have entered during the payment page to collect
        your ticket(s) at the box office.
      </p>
      <br />
      <hr />
      <br />
      <p className="bold">Be early for your movie!</p>
      <p>
        Due to the increased volume in online bookings, and SafeEntry to malls
        and premise, we strongly encourage patrons to be early for the movie.
        Thank you for the kind understanding & we hope you have a great movie
        experience at our theatres.
      </p>
      <br />
    </div>
  );
}
