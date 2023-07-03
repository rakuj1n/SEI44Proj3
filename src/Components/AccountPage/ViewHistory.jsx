import { Link } from "react-router-dom"
import { useRef, useState } from "react"


export default function ViewHistory({account}) {
    console.log("viewhist", account)
    const watchedList = account?.watchHistory.map((item) => {
        return (
        <div className='movieitem' key={item?._id}>
            <p>{item?.title}</p>
            <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
            <p></p>
            <p></p>
        </div>
        )
    })

    //----------------------------
    const [isDragging, setIsDragging] = useState(false)
    const [mouseStartX, setMouseStartX] = useState(0)
    const [scrollStartX, setScrollStartX] = useState(0)
    const scrollableRef = useRef(null)

    const handleMouseDown = (e) => {
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