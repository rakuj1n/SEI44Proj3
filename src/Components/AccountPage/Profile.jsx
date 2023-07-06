import ViewHistory from "./ViewHistory";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import sendRequest from "../../utilities/send-request";
import Loading from "../Loading";

export default function Profile({user}) {
  const [account, setAccount] = useOutletContext();
  const [status, setStatus] = useState("idle");

  const { userId } = useParams();

  const followingList = account?.following.map((item) => {
    return (
      <span className='profilefollowingitem'>
        <Link style={{ textDecoration:'none', color:'inherit'}} to={`/users/${item._id}`}>{item.name}</Link>
      </span>
    );
  });

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
  }, [userId]);

  const profilePic =
    account?.user.picture ||
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png";

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <main className="profilecontainer test">
      <div className="profile">
        <h1> Profile</h1>
        <div className="profiledetails">
          <img alt="profile" width="15%" src={profilePic} />
          <div className="profiledetailsinner">
            <h3>{account?.user.name}</h3>
            <p>Following: {followingList}</p>
          </div>
        </div>
      </div>
      <ViewHistory user={user} account={account} />
    </main>
  );
}
