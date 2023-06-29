

export default function Settings() {


    return (
        <main>
            <h3>Change My Profile Picture</h3>
            <form>
                <label>Enter your image URL:<input type='url'></input></label>
                <button>Upload</button>
            </form>
            <h3>Change My Password</h3>
            <form>
                <label>Current Password:<input type='password' name='confirm'></input></label>
                <label>New Password:<input type='password' name='password'></input></label>
                <button>Submit</button>
            </form>
        </main>
    )
}