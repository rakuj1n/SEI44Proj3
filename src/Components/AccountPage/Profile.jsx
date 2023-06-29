import ViewHistory from "./ViewHistory";
import { useOutlet, useOutletContext } from "react-router-dom";

export default function Profile() {
    const [account] = useOutletContext()
    console.log(account)
    return (
        <main>
            <h1>AccountPage</h1>
            <img src={`${account?.user.picture}`}/>
            <p>{account?.user.name}</p>
            <ViewHistory />
        </main>
    )
}