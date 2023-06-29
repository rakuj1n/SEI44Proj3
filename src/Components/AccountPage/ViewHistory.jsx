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
        <div>
            <h2>Your Watch History</h2>
            <div>{watchedList}</div>
        </div>
    )
}