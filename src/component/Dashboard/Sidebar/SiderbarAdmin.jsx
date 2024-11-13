
import { Link } from 'react-router-dom'; 
const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li><Link to="/overview">Overview</Link></li>  
                <li><Link to="/uploadfile">Upload File</Link></li>
                <li><Link to="/sectioncard">Azure Cost</Link></li>
                <li><Link to="/container">Container</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
