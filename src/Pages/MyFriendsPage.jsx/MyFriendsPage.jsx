import AddFriends from "../../Components/MyFriendsPage/AddFriends"
import FriendList from "../../Components/MyFriendsPage/FriendList"
import MovieRecoList from "../../Components/MyFriendsPage/MovieRecoList"
import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useEffect, useState } from "react"
import Loading from "../../Components/Loading"


export default function MyFriendsPage({user}) {

    const {userId} = useParams()
    const [account,setAccount] = useState(null)
    const [trigger,setTrigger] = useState(false)
    const isUser = user._id == userId
    const [status, setStatus] = useState('idle')
    const [statusFriendList, setStatusFriendList] = useState('idle')

    const [allFollowingMovieRecoList,setAllFollowingMovieRecoList] = useState(null)
    
    let friendsNo = account?.following.length
    
    // this useEffect retrieves logged-in user's account and sets it to account state to access following array
    useEffect(() => {
        async function getAccount() {
            setStatusFriendList('loading')
            try {
                const account = await sendRequest(`/api/users/${user._id}`,'GET')
                setAccount(account)
            } catch (err) {
                console.log(err)
            }
            setStatusFriendList('success')
        }
        getAccount()
    },[trigger])

    const [currSelectedFollowing, setCurrSelectedFollowing] = useState(null)
    const [currSelectedFollowingAccount,setCurrSelectedFollowingAccount] = useState(null)

    function handleClick(id) {
        setCurrSelectedFollowing(id)
        if (currSelectedFollowing === id) {
            setCurrSelectedFollowing(null)
        }
    }

    // this useEffect retrieves the account of one of the following users that the logged-in user clicks on
    useEffect(() => {
        async function getAccount() {
            setStatus('loadingfollowing')
            try {
                const account = await sendRequest(`/api/users/${currSelectedFollowing}`,'GET')
                setCurrSelectedFollowingAccount(account)
            } catch (err) {
                console.log(err)
            }
            setStatus('success')
        }
        getAccount()
    },[currSelectedFollowing])

    useEffect(() => {
        async function getAllFollowingMovieRecoList() {
            setStatus('loadingfollowing')
            try {
                const res = await sendRequest(`/api/users/${user._id}/your-following-recommended`,'GET')
                console.log(res)
                setAllFollowingMovieRecoList(res[0].moviesRecommended)
            } catch (err) {
                console.log(err)
            }
            setStatus('success')
        }
        getAllFollowingMovieRecoList()
    },[trigger])


    return (
        <>
        {isUser ? 
        <main className="followingmaincontainer">
            <h1>Following ({friendsNo})</h1>
            <div className="followingmaininnercontainer">
            {status !== 'loading' ? <FriendList setCurrSelectedFollowing={setCurrSelectedFollowing} currSelectedFollowing={currSelectedFollowing} account={account} handleClick={handleClick}/> : <Loading />}
            <div className="addbuttoncontainer"><AddFriends account={account} user={user} setTrigger={setTrigger}/></div>
            </div>
            {status !== 'loadingfollowing' ? <MovieRecoList account={account} allFollowingMovieRecoList={allFollowingMovieRecoList} currSelectedFollowing={currSelectedFollowing} currSelectedFollowingAccount={currSelectedFollowingAccount}/> : <Loading />}
        </main>
        :
        <p>404 Page Not Found.</p>
        }
        </>
    )
}