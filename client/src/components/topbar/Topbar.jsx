import "./topbar.css";
import { Search , Person , Chat , Notifications} from "@material-ui/icons"


export default function Topbar() {
    return (
        <div className = "topbarContainer">
            <div className="topbarLeft">
                <img src="/assets/icons/travo.png" alt="" className="travoLogo" />
                <span className="logo">Travo Social</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className = "searchIcon" />
                    <input placeholder="Search for friends, post or videos" className="searchInput" />

                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HomePage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItems">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItems">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItems">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/1.jpg " alt="" className="topbarImg" />
            </div>
            
        </div>
    )
}
