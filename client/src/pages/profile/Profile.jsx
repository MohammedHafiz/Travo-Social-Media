import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Posts } from "../../dummyData";
import Post from "../../components/post/Post";
export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="assets/posts/3.jpeg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="assets/person/7.jpeg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Mohammed Hafiz BA</h4>
              <button className="editProfileButton">Edit Profile</button>
            </div>
            <div className="profileInfoDesc">Hello guys welcome back</div>
            <div className="userPostDetails">
              <span className="profilepostCount">
                <b>22 </b> posts
              </span>
              <span className="profileFollowersCount">
                <b>22 </b> Followers
              </span>
              <span className="profileFollowingCount">
                <b>22 </b> Following
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            {Posts.map((p) => (
              <Post key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
