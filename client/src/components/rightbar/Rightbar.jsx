import "./rightbar.css";
import {Users} from "../../dummyData"
import Onlinefriends from "../onlineFriends/Onlinefriends";

export default function Rightbar() {
    return (
        <div className="rightbar">
           <div className="rightbarWrapper">
               <div className="birthdayContainer">
                   <img src="/assets/icons/gift.png" alt="" className="birthdayImg" />
                   <span className="birthdayText">
                       <b>Hafiz</b>and <b> 3 other friends </b> have a bithday today
                   </span>
               </div>
               <img src="/assets/ad.png" alt="" className="birthdayrightbarAd" />
               <h4 className="rightbarTitle">Online Friends</h4>
               <div className="rightbarFriendslist">
                {Users.map(u=>(
                    <Onlinefriends key={u.id} user = {u}/>
                ))}
               </div>
           </div>
        </div>
    )
}
