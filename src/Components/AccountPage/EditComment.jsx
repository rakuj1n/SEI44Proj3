import { useState, useEffect } from "react";
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

export default function EditComment({user}) {

  const { state } = useLocation();
  const [comment,setComment] = useState('')
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate()
  console.log(state.item._id)
  
  useEffect(() => {
    setComment(state?.comment)
    setRating(state?.rating)
  },[])


  function handleChange(e) {
    setComment(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setStatus('loading')
    if (rating > 2) {
      console.log("Recommended! Rating:", rating);
      //Submit recommended
      try {
        await sendRequest(`/api/users/${user._id}/movies-recommended`, "PUT", {
          movieId: state.item._id,
        });
      } catch (err) {
        console.log(err);
      }
    }

    //submit comment to db!
    try {
      await sendRequest(
        `/api/movies/comments/${user._id}/${state.item._id}`,
        "PUT",
        { 
          comment: comment,
          rating: rating
        }
      );
    } catch (err) {
      console.log(err);
    }
    // setStatus('success')
    navigate(`/users/${user._id}`);
  };

    return (
      <main className="profilecontainer">
          <div className="profile">
              <h1>Edit Your Review</h1>
              <div className="editcontainer">
                  <img width='30%' src={`${state.item.poster}`} />
                  <div className="formcontainer">
                    <h3>{state?.item.title}</h3>
                    <form onSubmit={handleSubmit}>
                      <p>Comments:</p>
                      <input value={comment} name='comment' onChange={handleChange}/>
                      <p>Rating:</p>
                      <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                          index += 1;
                          return (
                            <button
                              type="button"
                              key={index}
                              className={
                                index <= (hover || rating)
                                  ? "star-rating-on"
                                  : "star-rating-off"
                              }
                              onClick={() => setRating(index)}
                              onMouseEnter={() => setHover(index)}
                              onMouseLeave={() => setHover(rating)}
                              onDoubleClick={() => {
                                setRating(0);
                                setHover(0);
                              }}
                            >
                              <span className="star">&#9733;</span>
                            </button>
                          );
                        })}
                      </div>
                      <button>Submit Review</button>
                    </form>
                  </div>
              </div>
          </div>
      </main>
    )
}