import ViewHistory from "./ViewHistory";
import { useOutlet, useOutletContext } from "react-router-dom";

export default function Profile() {
    const [account] = useOutletContext()
    console.log(account)

    const followingList = account?.following.map((item) => {
        return (<span>{item.name}</span>)
    })

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