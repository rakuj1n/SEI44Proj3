import { useEffect, useRef } from 'react'
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

    //----------------------------------
    const scrollableDivRef = useRef(null)
    function handleWheel(event) {
        const scrollableDiv = scrollableDivRef.current
        if (event.target === scrollableDiv || scrollableDiv.contains(event.target)) {
            event.preventDefault(); // Prevent default scrolling behavior
      
            // Adjust the scroll position based on the wheel delta
            scrollableDiv.scrollLeft += event.deltaY;
        }
    }

    useEffect(() => {
        const disableScroll = (event) => {
          const scrollableDiv = scrollableDivRef.current;
    
          // Check if the mouse is inside the scrollable div
          if (scrollableDiv.contains(event.target)) {
            event.preventDefault(); // Prevent default scrolling behavior
          }
        };
    
        // Add event listener to window to disable overall scrolling
        window.addEventListener('wheel', disableScroll, { passive: false });
    
        return () => {
          // Clean up the event listener when the component unmounts
          window.removeEventListener('wheel', disableScroll);
        };
      }, []);
//----------------------------

    return (
        <div className="followingrecommendationscontainer">
            {currSelectedFollowing && <h1>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h1>} 
            {!currSelectedFollowing && <h1>Your Following's Recommendations</h1>}
            {!currSelectedFollowing && <div onWheel={handleWheel} ref={scrollableDivRef} className="movielist">{followingsRecommendationsList}</div>}
            {currSelectedFollowing && <div onWheel={handleWheel} ref={scrollableDivRef} className="movielist">{movieRecoList}</div>}
        </div>
    )
}