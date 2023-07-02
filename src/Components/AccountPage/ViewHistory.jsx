import { Link } from "react-router-dom"


export default function ViewHistory({account}) {
    console.log("viewhist", account)
    const watchedList = account?.watchHistory.map((item) => {
        return (
        <div className='movieitem' key={item?._id}>
            <p>{item?.title}</p>
            <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
        </div>
        )
    })

    return (
        <div className="viewhistory">
            <h1>Watch History</h1>
            <div className="viewhistorymovies">{watchedList}</div>
        </div>
    )
}