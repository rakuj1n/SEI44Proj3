import { Outlet, useParams } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'
import { useState } from 'react'


export default function AccountPage({user}) {
    const {userId} = useParams()
    const [account, setAccount] = useState(null)
    const isUser = user._id == userId

    return (
        <main>
            {isUser && <AccountSideBar user={user}/>}
            <Outlet context={[account,setAccount]}/>
        </main>
    )
}