import { useState, useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useNavigate } from "react-router-dom"


export default function Settings({user}) {
    const {userId} = useParams()
    const navigate = useNavigate()
    const isUser = user._id == userId

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

    async function handleSubmitPicture(e) {
        e.preventDefault()
        try {
            await sendRequest(`/api/users/${userId}/pic`,'PUT',picData)
            navigate(`/users/${userId}`)
        } catch (err) {
            console.log(err)
        }       
    }

    const [error,setError] = useState('')

    async function handleSubmitPassword(e) {
        e.preventDefault()
        try {
            await sendRequest(`/api/users/${userId}/password`,'PUT',passData)
            navigate(`/users/${userId}`)
        } catch (err) {
            setError('Please re-enter current password.')
        }
    }

    const disabled = passData.confirm !== "" && (passData.confirm == passData.password)

    useEffect(() => {
        if (disabled) setError('Current Password and New Password cannot be the same.')
        if (!disabled) setError('')
    },[disabled])

    return (
        <>
        {isUser ? 
        <main>
            <h3>Change My Profile Picture</h3>
            <form onSubmit={handleSubmitPicture}>
                <label>Enter your image URL:<input type='url' name='url' value={picData.url} onChange={handleChangePic} required></input></label>
                <button>Upload</button>
            </form>
            <h3>Change My Password</h3>
            <form onSubmit={handleSubmitPassword}>
                <label>Current Password:<input minLength="8" type='password' name='confirm' value={passData.confirm} onChange={handleChangePass} required></input></label><span>{error}</span>
                <label>New Password:<input minLength="8" type='password' name='password' value={passData.password} onChange={handleChangePass} required></input></label>
                <button disabled={disabled}>Submit</button>
            </form>
        </main> 
        : 
        <p>Unauthorised.</p>
        }
        </>
    )
}