import { Link } from "react-router-dom";
import * as userService from '../utilities/users-service'

export default function Navbar({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <p>Hello, {user.name}</p>
            <Link to='/orders'>Order History</Link>
            <Link to='/orders/new'>New Order</Link>
            <Link to='' onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}