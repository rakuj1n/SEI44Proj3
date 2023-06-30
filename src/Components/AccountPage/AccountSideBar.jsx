import { Link, useOutletContext } from "react-router-dom";


export default function AccountSideBar({userId}) { //protect this component, own user only

    return (
        <div>
            <Link to={`/users/${userId}`}>Profile</Link>
            <Link to={`/users/${userId}/settings`}>Settings</Link>  
        </div>
    )
}