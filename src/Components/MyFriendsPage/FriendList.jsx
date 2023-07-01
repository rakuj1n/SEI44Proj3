import { useState } from "react"
import SearchFriends from "./SearchFriends"

export default function FriendList({account, handleClick,setCurrSelectedFollowing}) {
    const [filtered,setFiltered] = useState(false)
    const [filteredList,setFilteredList] = useState(null)

    const friendList = account?.following.map((item) => {
        return (
            <div key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        )
    })

    function handleFilter(searchInput) {
        const filteredFriendList = account?.following.filter(item => item.name.toUpperCase().startsWith(searchInput.toUpperCase()))
        const filtered = filteredFriendList.map((item) => {
            return (
                <div key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
            )
        })
        setFilteredList(filtered)
    }

    let list = filtered ? filteredList : friendList

    return (
        <div>
            {list}
            <SearchFriends setCurrSelectedFollowing={setCurrSelectedFollowing} handleFilter={handleFilter} setFiltered={setFiltered}/>
        </div>
    )
}