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
    const [status, setStatus] = useState('idle')
    
    let friendsNo = account?.following.length
    
    // this useEffect retrieves logged-in user's account and sets it to account state to access following array
    useEffect(() => {
        async function getAccount() {
            setStatus('loading')
            try {
                const account = await sendRequest(`/api/users/${user._id}`,'GET')
                setAccount(account)
            } catch (err) {
                console.log(err)
            }
            setStatus('success')
        }
        getAccount()
    },[trigger])

    const [currSelectedFollowing, setCurrSelectedFollowing] = useState(null)
    const [currSelectedFollowingAccount,setCurrSelectedFollowingAccount] = useState(null)

    function handleClick(id) {
        setCurrSelectedFollowing(id)
        console.log("this",currSelectedFollowing)
    }

    // this useEffect retrieves the account of one of the following users that the logged-in user clicks on
    useEffect(() => {
        async function getAccount() {
            setStatus('loadingfollowing')
            try {
                const account = await sendRequest(`/api/users/${currSelectedFollowing}`,'GET')
                setCurrSelectedFollowingAccount(account)
                console.log("following",account)
            } catch (err) {
                console.log(err)
            }
            setStatus('success')
        }
        getAccount()
    },[currSelectedFollowing])


    return (
        <>
        {isUser ? 
        <main>
            <h1>Following ({friendsNo})</h1>
            {status !== 'loading' ? <FriendList account={account} handleClick={handleClick}/> : <p>loadingaccount</p>}
            <AddFriends account={account} user={user} setTrigger={setTrigger}/>
            {status !== 'loadingfollowing' ? <MovieRecoList account={account} currSelectedFollowing={currSelectedFollowing} currSelectedFollowingAccount={currSelectedFollowingAccount}/> : <p>loadingfollowing</p>}
        </main>
        :
        <p>Unauthorised.</p>
        }
        </>
    )
}