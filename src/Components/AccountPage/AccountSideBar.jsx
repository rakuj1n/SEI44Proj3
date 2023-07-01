import { Link } from "react-router-dom";


export default function AccountSideBar({user}) { 

    return (
        <div>
            <Link to={`/users/${user._id}`}>Profile</Link>
            <Link to={`/users/${user._id}/settings`}>Settings</Link>  
        </div>
    )
}