import {  Button, Drawer  } from 'antd'
import { useState } from "react"
import sendRequest from "../../utilities/send-request"


export default function AddFriends({account,setTrigger,user}) {
    const [input,setInput] = useState('')
    const [open, setOpen] = useState(false)
    const [error,setError] = useState('')
    console.log('addfriendsuser',user?._id)

    function showDrawer() {
        setOpen(true);
    };
    function onClose() {
        setOpen(false);
    };

    async function handleAdd(e) {
        e.preventDefault()
        try {
            await sendRequest(`/api/users/${user?._id}/friend`,'PUT',{username:input})
            onClose()
            setTrigger(prev => !prev)
        } catch (err) {
            setError("Error: Please check username.")
        }    
    }

    function handleChange(e) {
        setInput(e.target.value)
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