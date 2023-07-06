import { Link, useLocation, useNavigate } from "react-router-dom";
import MovieDetail from "../../Components/SeatSelectionPage/MovieDetail";
import { useEffect } from "react";

export default function TicketConfirmationPage({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state === null) {
      return navigate("/mainpage");
    }
  }, []);

  return (
    <div className="ticketConfirmation">
      <div className="ticketBorderBottom">
        <h1>Ticket Booking has been Confirmed!</h1>
        <p>
          Hi {user.name}, Thank you for your purchase! We look forward to seeing
          you in the cinema.
        </p>
        <br />
        <h2>Booking Details</h2>
        <MovieDetail
          movieTitle={location?.state?.movieTitle}
          moviePoster={location?.state?.moviePoster}
          theatre={location?.state?.theatre}
          timing={location?.state?.timing}
        />
        <br />
        <h2>You have booked ({location?.state?.qty}) Tickets</h2>
        <br />
      </div>
      <br />
      <div className="ticketBorderBottom">
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
          contact number that you have entered during the payment page to
          collect your ticket(s) at the box office.
        </p>
        <br />
      </div>
      <br />
      <div>
        <p className="bold">Be early for your movie!</p>
        <p>
          Due to the increased volume in online bookings, and SafeEntry to malls
          and premise, we strongly encourage patrons to be early for the movie.
          Thank you for the kind understanding & we hope you have a great movie
          experience at our theatres.
        </p>
      </div>
      <br />
      <Link to={"/mainpage"}>
        <div className="ticketMainButton">
          <button>Return to Main</button>
        </div>
      </Link>
    </div>
  );
}
