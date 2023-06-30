import { useEffect } from "react";
import ViewHistory from "./ViewHistory";
import sendRequest from "../../utilities/send-request"
import { useOutlet, useOutletContext } from "react-router-dom";

export default function Profile({ user }) {
    const {userId} = useOutletContext()

    useEffect(() => {
        sendRequest(`/api/users/${userId}`,'GET')
    },[])

    return (
        <main>
            <h1>AccountPage</h1>
            <img src={`${user.picture}`}/>
            <p>{user.name}</p>
            <ViewHistory user={user}/>
        </main>
    )
}