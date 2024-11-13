import HeaderAdmin from "../Dashboard/HeaderAdmin/HeaderAdmin";
import FooterAdmin from "../Dashboard/FooterAdmin/FooterAdmin";
import './StyleDashboard/styleDashboard.css';
import Sidebar from "./Sidebar/SiderbarAdmin";
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <HeaderAdmin />
            <div className="main-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="content">
                    <div className="cards-container">
                        <div className="card">
                            <h3 style={{color:"#00aaff"}}>Welcome Admin</h3>
                        </div>
                    </div>
                </div>
            </div>
            <FooterAdmin />
        </div>
    );
};

export default Dashboard;
