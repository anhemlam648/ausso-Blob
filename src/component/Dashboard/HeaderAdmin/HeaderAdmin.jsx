import './styleHeaderAdmin.css';
import axios from 'axios';
import { useState, useEffect } from "react";
const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
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
    //   const handleLogin = () => {
    //     window.location.href = "http://localhost:5010/api/v1/login";
    //   };
    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:5010/api/v1/logout", {}, { withCredentials: true });
          setIsAuthenticated(false);
          setUserInfo(null);
          window.location.href = "http://localhost:5010/api/v1/login";
          // handleLogin(true);
        } catch (error) {
          console.error("Logout failed", error);
        }
      };
      useEffect(() => {
        checkAuth();
        // fetchAzureCost();
      }, []);
    return (
        <header className="header">
            <div className="logo">
                <h1>Azure Dashboard</h1>
            </div>
            {!isAuthenticated ? (
                <div>
                {/* <button onClick={handleLogin} className="buttonLogin">Login Microsoft</button> */}
              </div>
            ) : (
            <div className="header-right">
                <div className="user-info">
                {/* <span>{userInfo ?|| ''}</span>  */}
                    <button className="logout-btn" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path d="M9 12.5a.5.5 0 0 1-.5-.5V10H3.707a.5.5 0 0 1-.354-.854l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.354.854H9v1a.5.5 0 0 1-.5.5z"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
            )}
        </header>
    );
};

export default Header;
