import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StyleDashboard/styleHomeAdmin.css';

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    checkAuth();
  }, []);

  
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


  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/user-info", {
        withCredentials: true,
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  
  const handleLogin = () => {
    window.location.href = "http://localhost:5010/api/v1/login";
  };

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

  return (
    <div className="home-container">
      <Header />
      <h2 className="Title_User">Hello, Welcome Admin</h2>
      
      {!isAuthenticated ? (
        <div>
          <button onClick={handleLogin} className="buttonLogin">
            Login with Microsoft
          </button>
        </div>
      ) : (
        <div>
          {!userInfo ? (
            <p>Loading user data...</p>
          ) : (
            <>
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
