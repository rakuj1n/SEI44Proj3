import { CloseOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import Loading from "../Loading";

export default function AccountFollowing({user}) {

    const [account, setAccount] = useOutletContext()
    const [status, setStatus] = useState("idle")
    const { userId } = useParams()
    const isUser = user._id == userId
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        async function getAccount() {
          setStatus("loading");
          try {
            const account = await sendRequest(`/api/users/${userId}`, "GET");
            setAccount(account);
          } catch (err) {
            console.log(err);
          }
          setStatus("success");
        }
        getAccount();
      }, [userId,trigger]);

    async function handleDelete(idToDelete) {
        try {
            await sendRequest(`/api/users/${userId}/following`, "DELETE",{id:idToDelete});
            setTrigger(prev => !prev)
        } catch (err) {
            console.log(err)
        }
    }

    if (status === "loading") {
        return <Loading />
    }

    const followingList = account?.following.map((item) => {
        return (
          <div className='profilefollowingitemfollowing'>
            <Link className='followinglink' style={{ textDecoration:'none', color:'inherit'}} to={`/users/${item._id}`}><img className='profilefollowingpic' alt='' src={`${item.picture}`} /></Link>
            <Link className='followinglink' style={{ textDecoration:'none', color:'inherit'}} to={`/users/${item._id}`}><p>{item.name}</p></Link>
            {isUser && <CloseOutlined onClick={() => handleDelete(item._id)}/>}
          </div>
        );
      });


    return (
        <main className="profilecontainer">
            <div className="profile">
                <h1>My Following</h1>
                <div className="profiledetailsinner">
                    <p>{followingList}</p>
                </div>
            </div>
        </main>
    )
}