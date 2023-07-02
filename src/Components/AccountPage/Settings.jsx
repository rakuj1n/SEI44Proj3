import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import sendRequest from "../../utilities/send-request"
import { useNavigate } from "react-router-dom"
import { Button } from "antd"


export default function Settings({user}) {
    const {userId} = useParams()
    const navigate = useNavigate()
    const isUser = user._id == userId
    const [status, setStatus] = useState('idle')

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
        setStatus('loading')
        try {
            await sendRequest(`/api/users/${user._id}/pic`,'PUT',picData)
            navigate(`/users/${user._id}`)
        } catch (err) {
            console.log(err)
        } 
        setStatus('success')      
    }

    const [error,setError] = useState('')

    async function handleSubmitPassword(e) {
        e.preventDefault()
        setStatus('loading')
        try {
            await sendRequest(`/api/users/${user._id}/password`,'PUT',passData)
            navigate(`/users/${user._id}`)
        } catch (err) {
            setError('Please re-enter current password.')
        }
        setStatus('success')      
    }

    const disabled = passData.confirm !== "" && (passData.confirm == passData.password)

    useEffect(() => {
        if (disabled) setError('Current Password and New Password cannot be the same.')
        if (!disabled) setError('')
    },[disabled])

    if (status === 'loading') {
        return (<p>loading</p>)
    }

    return (
        <>
        {isUser ? 
        <main className="settingscontainer">
            <h1>Change My Profile Picture</h1>
            <form onSubmit={handleSubmitPicture}>
                <label>Enter your image URL:<input className="forminput" type='url' name='url' value={picData.url} onChange={handleChangePic} required></input></label>
                <button>Upload</button>
            </form>
            <h1>Change My Password</h1>
            <form onSubmit={handleSubmitPassword}>
                <div className="currpass"><label>Current Password:<input className="forminput" minLength="8" type='password' name='confirm' value={passData.confirm} onChange={handleChangePass} required></input></label><span>{error}</span></div>
                <div className="newpass"><label>New Password:<input className="forminput" minLength="8" type='password' name='password' value={passData.password} onChange={handleChangePass} required></input></label></div>
                <button disabled={disabled}>Submit</button>
            </form>
        </main> 
        : 
        <p>Unauthorised.</p>
        }
        </>
    )
}