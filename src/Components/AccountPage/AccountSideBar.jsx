import { Link } from "react-router-dom";


export default function AccountSideBar({user}) { 

    return (
        <div className="accountsidebarcontainer">
            <Link className="accountsidebaritem" style={{ textDecoration:'none', color:'inherit'}} to={`/users/${user._id}`}>Profile</Link>
            <Link className="accountsidebaritem" style={{ textDecoration: 'none', color:'inherit' }} to={`/users/${user._id}/following`}>Following</Link>
            <Link className="accountsidebaritem" style={{ textDecoration: 'none', color:'inherit' }} to={`/users/${user._id}/settings`}>Settings</Link>
        </div>
    )
}