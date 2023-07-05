import { StarOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MovieRecoList({currSelectedFollowingAccount,currSelectedFollowing,account,allFollowingMovieRecoList}) {

    console.log("currSelectedFollowing",currSelectedFollowing)
    
    const movieRecoList = currSelectedFollowingAccount?.moviesRecommended.map((item) => {
        return (
            <div className='movieitem' key={(item.comments.find(item => item.userId == currSelectedFollowing))?.rating}>
                <p><strong>{item?.title}</strong></p>
                <Link to={`/movies/${item?._id}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
                {(item.comments.find(item => item.userId == currSelectedFollowing)) && 
                <div className="commentsectionitem">
                    <div>
                    <img className="profilepic" src={`${currSelectedFollowingAccount?.user.picture}`} />
                    <p style={{margin:"0"}}>{(item.comments.find(item => item.userId == currSelectedFollowing))?.rating} <StarOutlined /></p>
                    </div>
                    <p>
                        {(account?.following.find(item => item?._id === currSelectedFollowing))?.name}: <em>"{(item.comments.find(item => item.userId == currSelectedFollowing))?.comment}"</em>
                    </p>
                </div>}
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
    
    console.log(allFollowingMovieRecoList)
    const followingsRecommendationsList = allFollowingMovieRecoList?.map((item) => {

        const avgRating = (
            (item.comments
                .map(item => ({"rating":item.rating,"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture,"userid":item.userId._id}))
                .filter(item => (account ? (account?.following.map(item => item._id)):[]).includes(item.userid))
                .reduce((acc, curr) => acc + curr.rating,0))
            /
            (item.comments
                .map(item => ({"rating":item.rating,"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture,"userid":item.userId._id}))
                .filter(item => (account ? (account?.following.map(item => item._id)):[]).includes(item.userid))).length
                ).toFixed(1)

        return (
            <div className='movieitem' key={isNaN(avgRating) ? "0" : avgRating}>
                <p><strong>{item.title}</strong></p>
                <Link to={`/movies/${item?._id}`}><img alt='poster' className='poster' src={item.poster}/></Link>
                <p><em>Average following's rating:&nbsp;  
                    <strong>{isNaN(avgRating) ? "Not Rated" : avgRating} {isNaN(avgRating) ? "" : <StarOutlined />}</strong></em></p>
                <div className="commentsection">
                    {item.comments
                    .map(item => ({"rating":item.rating,"comment":item.comment,"name":item.userId.name,"picture":item.userId.picture,"userid":item.userId._id}))
                    .filter(item => (account ? (account?.following.map(item => item._id)):[]).includes(item.userid))
                    .map(item => 
                    <div className="commentsectionitem">
                        <div>
                            <img className="profilepic" src={`${item.picture}`}/>
                            <p style={{margin:"0",marginBottom:"0"}}><strong>{item.rating}</strong> <StarOutlined /></p>
                        </div>
                        <p>{item.name}: <em>"{item.comment}"</em></p>
                    </div>)}
                </div>
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
             className="movielist">{followingsRecommendationsList?.sort((a,b) => b.key - a.key)}</div>}

            {currSelectedFollowing && <div style={style}
            ref={scrollableRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} 
            className="movielist">{movieRecoList?.sort((a,b) => b.key - a.key)}</div>}
        </div>
    )
}
