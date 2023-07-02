import { useState } from "react"
import SearchFriends from "./SearchFriends"

export default function FriendList({account, handleClick,setCurrSelectedFollowing,currSelectedFollowing}) {
    const [filtered,setFiltered] = useState(false)
    const [filteredList,setFilteredList] = useState(null)

    const friendList = account?.following.map((item) => {
        return (
            <div style={{color: currSelectedFollowing === item._id ? '#FFFFFF' : ''}} className='followingitem' key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
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
            <div style={{color: currSelectedFollowing === item._id ? '#FFFFFF' : ''}} className='followingitem' key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        )
    }) : friendList

    return (
        <div className="followingcontainer">
            <div className="followingdetails">{list}</div>
            <SearchFriends setCurrSelectedFollowing={setCurrSelectedFollowing} handleFilter={handleFilter} setFiltered={setFiltered}/>
        </div>
    )
}