import { Link, useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { StarOutlined } from "@ant-design/icons"


export default function ViewHistory({account,user}) {
    console.log("viewhist", account)
    const {userId} = useParams()
    console.log(userId)
    const isUser = user._id == userId
    
    const watchedList = account?.watchHistory.map((item) => {

        const comment1 = item.comments.filter(item => item.userId === account.user._id)

        return (
        <div className='movieitem' key={item?._id}>
            <p><strong>{item?.title}</strong></p>
            <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
            {isUser && 
            <div className="commentsectionitem commentwedit">
                <Link state={{item, comment:comment1[0]?.comment, rating:comment1[0]?.rating}} className='editcomment' to={`/users/${account?.user._id}/${item?._id}/editcomment`}>Edit Review</Link>
                <div>
                    <img className="profilepic" src={`${account?.user.picture}`}/>
                    <p style={{margin:"0",marginBottom:"0"}}>
                        <strong>{comment1[0]?.rating == 0 ? "" : comment1[0]?.rating}</strong> <StarOutlined />
                    </p>
                </div>
                {comment1[0]?.comment.length > 0 ? 
                <p>{account?.user.name}: <em>"{comment1[0]?.comment}"</em></p> : 
                <p><em>No review yet.</em></p>}
            </div>
            }   
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
        <div className="viewhistory">
            <h1>Watch History</h1>
            <div style={style} ref={scrollableRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="viewhistorymovies">{watchedList}</div>
        </div>
    )
}