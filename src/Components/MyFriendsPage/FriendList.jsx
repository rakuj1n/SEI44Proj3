import { useRef, useState } from "react"
import SearchFriends from "./SearchFriends"

export default function FriendList({account, handleClick,setCurrSelectedFollowing,currSelectedFollowing}) {
    const [filtered,setFiltered] = useState(false)
    const [filteredList,setFilteredList] = useState(null)

    const friendList = account?.following.map((item) => {
        return (
            <div style={{backgroundColor: currSelectedFollowing === item._id ? '#FDFD96' : ''}} className='followingitem' key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        )
    })

    function handleFilter(searchInput) {
        const filteredFriendList = account?.following.filter(item => item.name.toUpperCase().startsWith(searchInput.toUpperCase()))
        // friendlistfiltered = friendList?.filter(item => (filteredFriendList.map(item => item._id)).includes(item.key))
        // const filtered = filteredFriendList.map((item) => {
        //     return (
        //         <div style={{color: currSelectedFollowing === item._id ? '#FFFFFF' : ''}} className='followingitem' key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        //     )
        // })
        setFilteredList(filteredFriendList)
    }
    
    let list = filtered ? filteredList.map((item) => {
        return (
            <div style={{backgroundColor: currSelectedFollowing === item._id ? '#FDFD96' : ''}} className='followingitem' key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        )
    }) : friendList

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
        <div className="followingcontainer">
            <div style={style}
            ref={scrollableRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="followingdetails">{list}</div>
            <SearchFriends setCurrSelectedFollowing={setCurrSelectedFollowing} handleFilter={handleFilter} setFiltered={setFiltered}/>
        </div>
    )
}