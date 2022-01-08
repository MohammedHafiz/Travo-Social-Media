import './sidebar.css';
import { RssFeed, Settings, Chat, VideoCall, Group, Bookmark } from "@material-ui/icons";
import {Users} from "../../dummyData"
import Followers from './followers/Followers';

 
export default function Sidebar() {
    return (
        <div className = "sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <VideoCall className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li> <li className="sidebarListItem">
                        <Group className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li> <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <Settings className="sidebarIcon"/>
                        <span className="sidebarListItemText">Settings</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                   {Users.map(u=>(
                       <Followers key={u.id} user ={u} />
                   ))}
                </ul>
            </div>
        </div>
    )
}

