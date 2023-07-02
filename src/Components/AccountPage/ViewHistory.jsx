import { useOutletContext } from "react-router-dom"
import MovieCard from "../MovieCard"

export default function ViewHistory({account}) {
    console.log("viewhist", account)
    const watchedList = account?.watchHistory.map((item) => {
        return (
            <MovieCard item={item}/>
        )
    })

    return (
        <div className="viewhistory">
            <h1>Watch History</h1>
            <div className="viewhistorymovies">{watchedList}</div>
        </div>
    )
}