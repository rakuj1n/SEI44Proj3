import AddFriends from "../../Components/MyFriendsPage/AddFriends"
import FriendList from "../../Components/MyFriendsPage/FriendList"
import MovieRecoList from "../../Components/MyFriendsPage/MovieRecoList"
import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useEffect, useState } from "react"


export default function MyFriendsPage({user}) {

    const {userId} = useParams()
    const [account,setAccount] = useState(null)
    const [trigger,setTrigger] = useState(false)
    const isUser = user._id == userId
    
    let friendsNo = account?.following.length
    
    useEffect(() => {
        async function getAccount() {
            try {
                const account = await sendRequest(`/api/users/${userId}`,'GET')
                setAccount(account)
                console.log('account',account)
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()
    },[userId,trigger])

    const [currSelectedFollowing, setCurrSelectedFollowing] = useState(null)
    const [currSelectedFollowingAccount,setCurrSelectedFollowingAccount] = useState(null)

    function handleClick(id) {
        setCurrSelectedFollowing(id)
        console.log("this",currSelectedFollowing)
    }

    useEffect(() => {
        async function getAccount() {
            try {
                const account = await sendRequest(`/api/users/${currSelectedFollowing}`,'GET')
                setCurrSelectedFollowingAccount(account)
                console.log("following",account)
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()
    },[currSelectedFollowing])

    return (
        <>
        {isUser ? 
        <main>
            <h1>Following ({friendsNo})</h1>
            <FriendList account={account} handleClick={handleClick}/>
            <AddFriends account={account} setTrigger={setTrigger}/>
            <MovieRecoList account={account} currSelectedFollowing={currSelectedFollowing} currSelectedFollowingAccount={currSelectedFollowingAccount}/>
        </main>
        :
        <p>Unauthorised.</p>
        }
        </>
    )
}