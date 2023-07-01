

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account}) {

    console.log("currSelectedFollowing",currSelectedFollowing)
    
    const movieRecoList = currSelectedFollowingAccount?.moviesRecommended.map((item) => {
        return (
            <div key={item._id}>
                <p>{item.title}</p>
                <img alt='poster' width='15%' src={item.poster}/>
                <p>{(account?.following.find(item => item._id === currSelectedFollowing)).name} says: {(item?.comments.find(item => item.userId == currSelectedFollowing))?.comment}</p>
                <p>Movie Details</p>
            </div>
        )
    })

    const myMovieRecoList = account?.moviesRecommended.map((item) => {
        return (
            <div key={item._id}>
                <p>{item.title}</p>
                <img alt='poster' width='15%' src={item.poster}/>
                <p>{account?.user.name} says: {(item?.comments.find(item => item.userId == currSelectedFollowing))?.comment}</p>
                <p>Movie Details</p>
            </div>
        )
    })


    return (
        <div>
            {currSelectedFollowing && <h2>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h2>} 
            {!currSelectedFollowing && <h2>Your Recommendations</h2>}
            {!currSelectedFollowing && myMovieRecoList}
            {movieRecoList}
        </div>
    )
}