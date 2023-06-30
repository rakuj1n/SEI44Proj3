import ViewHistory from "./ViewHistory";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect } from "react";
import sendRequest from "../../utilities/send-request"


export default function Profile() {
    const [account,setAccount] = useOutletContext()
    console.log(account)

    const {userId} = useParams()

    const followingList = account?.following.map((item) => {
        return (<span>{item.name}</span>)
    })

    useEffect(() => {
        async function getAccount() {
            try {
                const account = await sendRequest(`/api/users/${userId}`,'GET')
                setAccount(account)
            } catch (err) {
                console.log(err)
            }
        }
        getAccount()
    },[userId])

    const profilePic = account?.user.picture || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'

    return (
        <main>
            <h1>Profile</h1>
            <img alt='profile' width='15%' src={profilePic}/>
            <h3>{account?.user.name}</h3>
            <p>Following: {followingList}</p>
            <ViewHistory account={account}/>
        </main>
    )
}