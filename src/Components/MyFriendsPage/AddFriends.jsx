import {  Button, Drawer  } from 'antd'
import { useState } from "react"
import sendRequest from "../../utilities/send-request"


export default function AddFriends({account,setTrigger,user}) {
    const [input,setInput] = useState('')
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    const [status, setStatus] = useState('idle')
    console.log('addfriendsuser',user?._id)

    function showDrawer() {
        setOpen(true);
    };
    function onClose() {
        setOpen(false);
    };

    async function handleAdd(e) {
        e.preventDefault()
        setStatus('loading')
        try {
            await sendRequest(`/api/users/${user?._id}/friend`,'PUT',{username:input})
            onClose()
            setTrigger(prev => !prev)
        } catch (err) {
            setError("Error: Please check username.")
        }    
        setStatus('success')
    }

    function handleChange(e) {
        setInput(e.target.value)
    }

    if (status === 'loading') {
        return (<p>loading</p>)
    }

    return (
        <>
        <Button type="ghost" onClick={showDrawer}>
            +
        </Button>
        <Drawer title="Add people you'd like to follow" placement="right" onClose={onClose} open={open}>
            <p>Type a username:</p>
            <form onSubmit={handleAdd}>
                <label><input name='input' value={input} onChange={handleChange}/></label>
                <button>Follow</button>
                <p>{error}</p>
            </form>
            
        </Drawer>
        </>
    )
}