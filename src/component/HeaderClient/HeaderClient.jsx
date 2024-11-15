// src/component/Header.jsx
import { Link } from 'react-router-dom';
import '../HeaderClient/styleHeaderClient/styleHeaderClient.css'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
function Header() {
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
        // // Xử lý logout
      const handleLogout = async () => {
        try {
          await axios.post("http://localhost:5010/api/v1/logout", {}, { withCredentials: true });
          setIsAuthenticated(false);
          setUserInfo(null);
          window.location.href = "http://localhost:5010/api/v1/login";
        } catch (error) {
          console.error("Logout failed", error);
        }
      };
    //  Xử lý Login
    const handleLogin = () => {
      window.location.href = "http://localhost:5010/api/v1/login";
      };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar" > 
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CMCTS</Link>
        {/* <Link className="navbar-brand" to="/dashboard">CMCTS</Link> */}
        {/* Button để toggle menu trên màn hình nhỏ */}
        {
        !isAuthenticated  ? (
           <div>
             <button onClick={handleLogin} className="buttonLogin">
                    Login with Microsoft
                  </button>
           </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link page" aria-current="page" to="/dashboard">Home Admin</Link>
              </li>
            </ul>
            <button onClick={handleLogout} className="buttonLogout" style={{background:"red"}}>Logout</button>
          </div>
          )
        }
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
