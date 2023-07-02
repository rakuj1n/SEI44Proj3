import { Link } from "react-router-dom";


export default function AccountSideBar({user}) { 

    return (
        <div className="accountsidebarcontainer">
            <div><Link to={`/users/${user._id}`}>Profile</Link></div>
            <div><Link to={`/users/${user._id}/settings`}>Settings</Link></div>
        </div>
    )
}