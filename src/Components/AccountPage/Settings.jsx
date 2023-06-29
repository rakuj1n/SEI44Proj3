import { useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useNavigate } from "react-router-dom"


export default function Settings() {
    const {userId} = useParams()
    const navigate = useNavigate()

    const [picData,setPicData] = useState({
        url:''
    })

    const [passData,setPassData] = useState({
        confirm:'',
        password:''
    })

    function handleChangePic(e) {
        setPicData((prev) => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        }) 
    }

    function handleChangePass(e) {
        setPassData((prev) => {
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    function handleSubmitPicture(e) {
        e.preventDefault()
        console.log(picData)
        async function getUserFromDb() {
            await sendRequest(`/api/users/${userId}`,'PUT',picData)
        }
        getUserFromDb()
        navigate(`/users/${userId}`)
    }

    function handleSubmitPassword(e) {
        e.preventDefault()
        console.log(passData)
    }


    return (
        <main>
            <h3>Change My Profile Picture</h3>
            <form onSubmit={handleSubmitPicture}>
                <label>Enter your image URL:<input type='url' name='url' value={picData.url} onChange={handleChangePic} required></input></label>
                <button>Upload</button>
            </form>
            <h3>Change My Password</h3>
            <form onSubmit={handleSubmitPassword}>
                <label>Current Password:<input type='password' name='confirm' value={passData.confirm} onChange={handleChangePass} required></input></label>
                <label>New Password:<input type='password' name='password' value={passData.password} onChange={handleChangePass} required></input></label>
                <button>Submit</button>
            </form>
        </main>
    )
}