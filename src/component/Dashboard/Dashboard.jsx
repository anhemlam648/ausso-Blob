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
                {/* <div className="content">
                    <div className="cards-container">
                        <div className="card">
                            <h3>Total Containers</h3>
                            <p>12</p>
                        </div>
                        <div className="card">
                            <h3>Active Blobs</h3>
                            <p>48</p>
                        </div>
                    </div>
                </div> */}
            </div>
            <FooterAdmin />
        </div>
    );
};

export default Dashboard;
