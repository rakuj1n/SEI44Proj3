import { Link } from 'react-router-dom'

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account,allFollowingMovieRecoList}) {

    console.log("currSelectedFollowing",currSelectedFollowing)
    
    const movieRecoList = currSelectedFollowingAccount?.moviesRecommended.map((item) => {
        return (
            <div className='movieitem' key={item?._id}>
                <p>{item?.title}</p>
                <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
                <div className="commentsectionitem">
                    <img className="profilepic" src={`${account?.user.picture}`} />
                    <p>{(account?.following.find(item => item?._id === currSelectedFollowing))?.name}: "{(item?.comments.find(item => item?.userId == currSelectedFollowing))?.comment}"</p>
                </div>
            </div>
        )
    })

    const myMovieRecoList = account?.moviesRecommended.map((item) => {
        return (
            <div key={item._id}>
                <p>{item.title}</p>
                <img alt='poster' className='poster' src={item.poster}/>
                <div className="commentsection">
                    <img src={`${account?.user.picture}`} /> 
                    <p>{account?.user.name} says: {(item?.comments.find(item => item.userId == currSelectedFollowing))?.comment}</p>
                </div>
            </div>
        )
    })
    
    const followingsRecommendationsList = allFollowingMovieRecoList?.map((item) => {
        return (
            <div className='movieitem' key={item.id}>
                <p>{item.title}</p>
                <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item.poster}/></Link>
                <div className="commentsection">{item.comments.map(item => ({"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture})).map(item => <div className="commentsectionitem"><img className="profilepic" src={`${item.picture}`}/><p>{item.name}: "{item.comment}"</p></div>)}</div>
            </div>
        )
    })


    return (
        <div className="followingrecommendationscontainer">
            {currSelectedFollowing && <h1>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h1>} 
            {!currSelectedFollowing && <h1>Your Following's Recommendations</h1>}
            {!currSelectedFollowing && <div className="movielist">{followingsRecommendationsList}</div>}
            {currSelectedFollowing && <div className="movielist">{movieRecoList}</div>}
        </div>
    )
}