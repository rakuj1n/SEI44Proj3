import MovieCard from "../MovieCard"

export default function ViewHistory({ user }) {

    const watchedList = user.watchHistory.map((item) => {
        return (
            <MovieCard item={item}/>
        )
    })

    return (
        <div>
            <h1>user's view history here</h1>
            <div>{watchedList}</div>
        </div>
    )
}