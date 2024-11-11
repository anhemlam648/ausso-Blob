import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StyleDashboard/styleHomeAdmin.css';

function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Kiểm tra tính xác thực khi component được mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Kiểm tra xem người dùng có xác thực hay không
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/check-auth", {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        fetchUserInfo();  // Lấy thông tin người dùng nếu đã xác thực
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check failed", error);
    }
  };

  // Lấy thông tin người dùng sau khi xác thực
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

  // Xử lý login
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
  return (
    <div className="home-container">
      <Header />
      <h2 className="Title_User">Hello, Welcome Admin</h2>
      
      {!isAuthenticated ? (
        <div>
          <button onClick={handleLogin} className="buttonLogin1">
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
          <button onClick={handleLogout} className="buttonLogout">Logout</button> 
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
