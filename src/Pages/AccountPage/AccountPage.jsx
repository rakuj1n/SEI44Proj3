import { Outlet } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'
import ViewHistory from '../../Components/AccountPage/ViewHistory'
import * as usersService from '../../utilities/users-service'

export default function AccountPage() {




    return (
        <main>
            <AccountSideBar />  {/* protect this route, own user only */}
            <Outlet />
        </main>
    )
}