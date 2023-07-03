import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account,allFollowingMovieRecoList}) {

    console.log("currSelectedFollowing",currSelectedFollowing)
    
    const movieRecoList = currSelectedFollowingAccount?.moviesRecommended.map((item) => {
        return (
            <div className='movieitem' key={item?._id}>
                <p><strong>{item?.title}</strong></p>
                <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
                <div className="commentsectionitem">
                    <img className="profilepic" src={`${account?.user.picture}`} />
                    <p>{(account?.following.find(item => item?._id === currSelectedFollowing))?.name}: <em>"{(item?.comments.find(item => item?.userId == currSelectedFollowing))?.comment}"</em></p>
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
                <p><strong>{item.title}</strong></p>
                <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item.poster}/></Link>
                <div className="commentsection">{item.comments.map(item => ({"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture})).map(item => <div className="commentsectionitem"><img className="profilepic" src={`${item.picture}`}/><p>{item.name}: <em>"{item.comment}"</em></p></div>)}</div>
            </div>
        )
    })

//----------------------------
    const [isDragging, setIsDragging] = useState(false)
    const [mouseStartX, setMouseStartX] = useState(0)
    const [scrollStartX, setScrollStartX] = useState(0)
    const scrollableRef = useRef(null)

    const handleMouseDown = (e) => {
        e.preventDefault()
        setIsDragging(true)
        setMouseStartX(e.pageX)
        setScrollStartX(scrollableRef.current.scrollLeft)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
        const mouseMoveX = e.pageX - mouseStartX
        scrollableRef.current.scrollLeft = scrollStartX - mouseMoveX
        }
    }

    const style = {
        cursor: isDragging ? 'grab' : 'auto'
    }

//----------------------------

    return (
        <div className="followingrecommendationscontainer">
            {currSelectedFollowing && <h1>{(account?.following.find(item => item._id === currSelectedFollowing))?.name}'s Recommendations</h1>} 
            {!currSelectedFollowing && <h1>Your Following's Recommendations</h1>}

            {!currSelectedFollowing && <div style={style}
            ref={scrollableRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}
             className="movielist">{followingsRecommendationsList}</div>}

            {currSelectedFollowing && <div style={style}
            ref={scrollableRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} 
            className="movielist">{movieRecoList}</div>}
        </div>
    )
}
