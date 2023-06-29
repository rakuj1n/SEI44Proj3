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
            const account = await sendRequest(`/api/users/${userId}`,'GET')
            setAccount(account[0])
        }
        getAccount()
    },[userId])

    return (
        <main>
            <h1>Profile</h1>
            <img src={`${account?.user.picture}`}/>
            <h3>{account?.user.name}</h3>
            <p>Following: {followingList}</p>
            <ViewHistory account={account}/>
        </main>
    )
}