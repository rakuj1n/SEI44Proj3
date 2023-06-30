import { PlusSquareOutlined } from "@ant-design/icons"
import {  Button, Drawer  } from 'antd'
import { useState } from "react"
import sendRequest from "../../utilities/send-request"

export default function AddFriends() {
    const [input,setInput] = useState('')
    const [open, setOpen] = useState(false)
    function showDrawer() {
        setOpen(true);
    };
    function onClose() {
        setOpen(false);
    };

    async function handleAdd(e) {
        e.preventDefault()
        console.log(input)
        // try {
        //     await sendRequest(`/api/users/${userId}/pic`,'PUT',picData)
        //     navigate(`/users/${userId}`)
        // } catch (err) {
        //     console.log(err)
        // }    
        // search database for inputted user
        // check if following array of logined user already has the inputted user in following array
        // if not, push it in
        // clear input
        // "user followed!"
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
            </form>
            
        </Drawer>
        </>
    )
}