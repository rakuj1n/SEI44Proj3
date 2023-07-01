

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account,allFollowingMovieRecoList}) {

    console.log("currSelectedFollowing",currSelectedFollowing)
    
    const movieRecoList = currSelectedFollowingAccount?.moviesRecommended.map((item) => {
        return (
            <div key={item?._id}>
                <p>{item?.title}</p>
                <img alt='poster' width='15%' src={item?.poster}/>
                <div>
                    <img width='5%' src={`${account?.user.picture}`} />
                    <p>{(account?.following.find(item => item?._id === currSelectedFollowing))?.name} says: {(item?.comments.find(item => item?.userId == currSelectedFollowing))?.comment}</p>
                </div>
                <p>Movie Details</p>
            </div>
        )
    })

    const myMovieRecoList = account?.moviesRecommended.map((item) => {
        return (
            <div key={item._id}>
                <p>{item.title}</p>
                <img alt='poster' width='15%' src={item.poster}/>
                <div>
                    <img width='5%' src={`${account?.user.picture}`} /> 
                    <p>{account?.user.name} says: {(item?.comments.find(item => item.userId == currSelectedFollowing))?.comment}</p>
                </div>
                <p>Movie Details</p>
            </div>
        )
    })
    
    const followingsRecommendationsList = allFollowingMovieRecoList?.map((item) => {
        return (
            <div key={item.id}>
                <p>{item.title}</p>
                <img alt='poster' width='15%' src={item.poster}/>
                <div>{item.comments.map(item => ({"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture})).map(item => <div><img width='5%' src={`${item.picture}`}/><p>{item.name} says "{item.comment}"</p></div>)}</div>
                <p>Movie Details</p>
            </div>
        )
    })


    return (
        <div>
            {currSelectedFollowing && <h2>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h2>} 
            {!currSelectedFollowing && <h2>Your Following's Recommendations</h2>}
            {!currSelectedFollowing && followingsRecommendationsList}
            {movieRecoList}
        </div>
    )
}