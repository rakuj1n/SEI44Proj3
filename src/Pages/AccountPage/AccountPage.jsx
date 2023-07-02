import { Outlet, useParams } from 'react-router-dom'
import AccountSideBar from '../../Components/AccountPage/AccountSideBar'
import { useState } from 'react'


export default function AccountPage({user}) {
    const {userId} = useParams()
    const [account, setAccount] = useState(null)
    const isUser = user._id == userId

    return (
        <main className={isUser ? 'accountpagemaincontainer' : 'accountpagemaincontainernosettings'}>
            {isUser && <div className='accountpageleft'><AccountSideBar user={user}/></div>}
            <div className='accountpageright'><Outlet context={[account,setAccount]}/></div>
        </main>
    )
}