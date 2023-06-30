

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account}) {
    console.log("user",currSelectedFollowing)
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


    return (
        <div>
            <h2>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h2> 
            {movieRecoList}
        </div>
    )
}