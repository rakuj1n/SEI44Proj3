import { Outlet, useParams } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'
import { useEffect, useState } from 'react'
import sendRequest from "../../utilities/send-request"

export default function AccountPage() {
    const {userId} = useParams()
    const [account, setAccount] = useState(null)

    return (
        <main>
            <AccountSideBar userId={userId}/>  {/* protect this route, own user only */}
            <Outlet context={[account,setAccount]}/>
        </main>
    )
}