import { useEffect, useState } from "react"
import sendRequest from "../../utilities/send-request"
import SearchFriends from "./SearchFriends"

export default function FriendList({account, handleClick}) {
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
            <SearchFriends handleFilter={handleFilter} setFiltered={setFiltered}/>
        </div>
    )
}