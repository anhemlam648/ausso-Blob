
import { Link } from 'react-router-dom'; 
const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li><Link to="/overview">Overview</Link></li>  
                <li><Link to="/uploadfile">Upload File</Link></li>
                <li><Link to="/sectioncard">Azure Cost</Link></li>
                <li><Link to="#">Settings</Link></li>
                <li><Link to="#">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
