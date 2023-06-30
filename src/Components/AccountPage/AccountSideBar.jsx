import { Link } from "react-router-dom";


export default function AccountSideBar() { //protect this component, own user only
    const id = 1 // to change to dynamic

    return (
        <div>
            <Link to={`/users/${id}`}>Profile</Link>
            <Link to={`/users/${id}/settings`}>Settings</Link>  
        </div>
    )
}