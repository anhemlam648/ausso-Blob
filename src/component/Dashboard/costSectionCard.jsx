// import { useState } from "react";
import HeaderAdmin from './HeaderAdmin/HeaderAdmin'
import FooterAdmin from "./FooterAdmin/FooterAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import './StyleDashboard/styleFile.css'
import Sidebar from './Sidebar/SiderbarAdmin';
function CostSectionCard(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [azureCostData, setAzureCostData] = useState(null);
    // useEffect(() => {
    //     fetch("/api/v1/user-info")
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log('Data received from API:', data);  // Kiểm tra dữ liệu trả về
    //         setUserInfo(data);
    //       })
    //       .catch((error) => console.error('Error fetching user info:', error));
    //   }, []);
    const checkAuth = async () => {
        try {
          const response = await axios.get("http://localhost:5010/api/v1/check-auth", {
            withCredentials: true,
          });
          if (response.data.isAuthenticated) {
            setIsAuthenticated(true);
            fetchUserInfo();
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Authentication check failed", error);
        }
      };
    
      // User info
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:5010/api/v1/user-info", {
            withCredentials: true,
          });
          console.log("Fetched User Info:", response.data);
          console.log(userInfo);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }
      };
    
    // Xử lý Login
      // const handleLogin = () => {
      //   window.location.href = "http://localhost:5010/api/v1/login";
      // };
    
    //   // Xử lý logout
    //   const handleLogout = async () => {
    //     try {
    //       await axios.post("http://localhost:5010/api/v1/logout", {}, { withCredentials: true });
    //       setIsAuthenticated(false);
    //       setUserInfo(null);
    //       window.location.href = "http://localhost:5010/api/v1/login";
    //     } catch (error) {
    //       console.error("Logout failed", error);
    //     }
    //   };

      const fetchAzureCost = async () => {
        try {
          const response = await axios.get("http://localhost:5010/api/v1/get-cost-management");
          if (response.data) {
            setAzureCostData(response.data); // Lưu dữ liệu chi phí vào state
          }
        } catch (error) {
          console.error("Failed to fetch Azure cost data", error);
        }
      };
      useEffect(() => {
        checkAuth();
        fetchAzureCost();
      }, []);
    //   return (
    //     <div className="upload-container">
    //     <HeaderAdmin />
    //     <div className="main-container">
    //       <div className="sidebar">
    //         <Sidebar />
    //       </div>
    //         <div className="content">
    //     <div className="App">
    //     <h1 className="Title">Container Management Section</h1>
    //       {!isAuthenticated ? (
    //         <div>
    //           <button onClick={handleLogin} className="buttonLogin1">Login with Microsoft</button>
    //         </div>
    //       ) : (
    //         <div>
    //         {!userInfo ? (
    //           <p>Loading user data...</p>
    //         ) : (
    //           <>
    //           <h2 className="Title_User">Welcome</h2>
    //             {/* <h2>Welcome, {userInfo.name || userInfo.preferred_username || "User"}!</h2> */}
    //             {/* <p>User Info: {JSON.stringify(userInfo)}</p> */}
    //           </>
    //         )}
             
    //          {/* Đăng xuất
    //         <button onClick={handleLogout} className="buttonLogout">Logout</button>
    //         */}

    //          {/* Hiển thị dữ liệu chi phí từ Azure */}
    //          <div className="azure-cost-section card">
    //           <div className="card-header">
    //             <h3 className="Title">Azure Cost Data</h3>
    //           </div>
    //           <div className="card-body">
    //             {azureCostData ? (
    //               <div className="cost-data-content">
    //                 <pre className="cost-data-pre">{JSON.stringify(azureCostData, null, 2)}</pre>
    //               </div>
    //             ) : (
    //               <p>Loading Azure cost data...</p>
    //             )}
    //           </div>
    //         </div> 
    //       </div>
    //       )}
    //     </div>
    //     <FooterAdmin />
    //     </div>
    //     </div>
    //     </div>
    //   );
    // }
    return (
      <div className="upload-container">
        <HeaderAdmin />
        <div className="main-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            <div className="App">
              <h1 className="upload-title">Container Management Section</h1>
              {!isAuthenticated ? (
                <div>
                  {/* <button onClick={handleLogin} className="buttonLogin1">Login with Microsoft</button> */}
                </div>
              ) : (
                <div>
                  {!userInfo ? (
                    <p>Loading user data...</p>
                  ) : (
                    <>
                      <h2 className="admin-welcome">Welcome, {userInfo.name || userInfo.preferred_username || "Admin"}!</h2>
                    </>
                  )}
  
                  {/* Hiển thị dữ liệu chi phí từ Azure */}
                  <div className="azure-cost-section card">
                    <div className="card-header">
                      <h3 className="Title">Azure Cost Data</h3>
                    </div>
                    <div className="card-body">
                      {azureCostData ? (
                        <div className="cost-data-content">
                          <pre className="cost-data-pre">{JSON.stringify(azureCostData, null, 2)}</pre>
                        </div>
                      ) : (
                        <p>Loading Azure cost data...</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    );
  }
export default CostSectionCard;