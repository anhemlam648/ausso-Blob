import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StyleDashboard/styleFile.css';
import { useNavigate } from "react-router-dom"; 
function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [containers, setContainers] = useState([]);
//   const [files, setFiles] = useState([]);  
//   const [selectedContainer, setSelectedContainer] = useState(null);  
  const navigate = useNavigate();
  // Kiểm tra tính xác thực người dùng
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/check-auth", {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        fetchUserInfo(); 
        fetchContainers(); 
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

 
  const fetchContainers = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/get-all-container", {
        withCredentials: true,
      });
      if (response.data && response.data.container) {
        setContainers(response.data.container); 
      }
    } catch (error) {
      console.error("Failed to fetch containers", error);
    }
  };


  const handleLogin = () => {
    window.location.href = "http://localhost:5010/api/v1/login";
  };

  const handleManageClick = (containerName) => {
  
    navigate(`/files/${containerName}`); 
  };


  useEffect(() => {
    checkAuth();
  }, []); 

  return (
    <div className="upload-container">
      <Header />
      <div className="App">
        <h1 className="Title">Container Management</h1>
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
              <h2 className="Title_User">Welcome</h2>
            )}

            <div className="container-list">
              {containers.length === 0 ? (
                <p>No containers available.</p>
              ) : (
                <div className="container-cards">
                  {containers.map((container, index) => (
                    <div key={index} className="container-card">
                      <h4>{container}</h4>
                      <button
                        className="btn-container-action"
                        onClick={() => handleManageClick(container)} 
                      >
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
{/* 
 
            {selectedContainer && (
              <div className="file-list">
                <h3>Files in {selectedContainer}:</h3>
                {files.length === 0 ? (
                  <p>No files available.</p>
                ) : (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file}</li>
                    ))}
                  </ul>
                )}
              </div>
            )} */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Container;
