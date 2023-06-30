import { Outlet, useParams } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'
import { useEffect, useState } from 'react'
import sendRequest from "../../utilities/send-request"

export default function AccountPage({user}) {
    const {userId} = useParams()
    const [account, setAccount] = useState(null)
    const isUser = user._id == userId

    return (
        <main>
            {isUser && <AccountSideBar userId={userId}/>}
            <Outlet context={[account,setAccount]}/>
        </main>
    )
}