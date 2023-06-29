

export default function Settings() {


    return (
        <main>
            <h3>Change My Profile Picture</h3>
            <form>
                <label><input type='file'></input></label>
                <button>Upload</button>
            </form>
            <h3>Change My Password</h3>
            <form>
                <label><input type='password'></input></label>
                <button>Change</button>
            </form>
        </main>
    )
}