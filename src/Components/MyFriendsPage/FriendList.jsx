import { useEffect, useState } from "react"
import sendRequest from "../../utilities/send-request"
import SearchFriends from "./SearchFriends"

export default function FriendList({account, handleClick}) {


    const friendList = account?.following.map((item) => {
        return (
            <div key={item._id} onClick={() => handleClick(item._id)}>{item.name}</div>
        )
    })

    return (
        <div>
            {friendList}
            <SearchFriends />
        </div>
    )
}