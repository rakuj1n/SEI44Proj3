import AddFriends from "../../Components/MyFriendsPage/AddFriends"
import FriendList from "../../Components/MyFriendsPage/FriendList"
import MovieRecoList from "../../Components/MyFriendsPage/MovieRecoList"
import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useEffect, useState } from "react"


export default function MyFriendsPage() {

    let friendsNo = 1
    const {userId} = useParams()
    const [account,setAccount] = useState(null)

    useEffect(() => {
        async function getAccount() {
            try {
                const account = await sendRequest(`/api/users/${userId}`,'GET')
                setAccount(account)
                console.log(account)
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()
    },[userId])

    const [currSelectedFollowing, setCurrSelectedFollowing] = useState(null)
    const [currSelectedFollowingAccount,setCurrSelectedFollowingAccount] = useState(null)

    function handleClick(userId) {
        setCurrSelectedFollowing(userId)
        console.log("this",currSelectedFollowing)
    }

    useEffect(() => {
        async function getAccount() {
            try {
                const account = await sendRequest(`/api/users/${currSelectedFollowing}`,'GET')
                setCurrSelectedFollowingAccount(account)
                console.log("account",account)
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()
    },[currSelectedFollowing])

    return (
        <main>
            <h1>Following ({friendsNo})</h1>
            <FriendList account={account} handleClick={handleClick}/>
            <AddFriends />
            <MovieRecoList account={account} currSelectedFollowing={currSelectedFollowing} currSelectedFollowingAccount={currSelectedFollowingAccount}/>
        </main>
    )
}