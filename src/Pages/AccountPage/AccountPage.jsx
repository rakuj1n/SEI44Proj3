import { Outlet, useParams } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'

export default function AccountPage() {
    const {userId} = useParams()
    console.log(userId)


    return (
        <main>
            <AccountSideBar />  {/* protect this route, own user only */}
            <Outlet context={{userId}}/>
        </main>
    )
}