import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAdmin from './HeaderAdmin/HeaderAdmin'
import FooterAdmin from "./FooterAdmin/FooterAdmin";
import Sidebar from "./Sidebar/SiderbarAdmin";
import './StyleDashboard/styleFile.css';
import { useNavigate } from "react-router-dom"; 
function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [containers, setContainers] = useState([]);
//   const [files, setFiles] = useState([]);  // Save State File 
//   const [selectedContainer, setSelectedContainer] = useState(null);  // Selection container
  const navigate = useNavigate();
  // Check auth
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
  const fetchContainers = async () => {
    try {
        const response = await axios.get("http://localhost:5010/api/v1/get-all-container", {
            withCredentials: true,
        });
        if (Array.isArray(response.data.container)) {
            setContainers(response.data.container); 
        } else {
            console.error("Expected an array but got:", response.data.container);
        }
    } catch (error) {
        console.error("Failed to fetch containers", error);
    }
};

  // Fetch thông tin người dùng
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

  // Fetch danh sách containers
  // const fetchContainers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5010/api/v1/get-all-container", {
  //       withCredentials: true,
  //     });
  //     if (response.data && response.data.container) {
  //       setContainers(response.data.container); // Lưu danh sách containers vào state
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch containers", error);
  //   }
  // };

  // Xử lý đăng nhập
  // const handleLogin = () => {
  //   window.location.href = "http://localhost:5010/api/v1/login";
  // };

  const handleManageClick = (containerName) => {
    navigate(`/files/${containerName}`); // Sử dụng navigate thay vì history.push
  };

  useEffect(() => {
    fetchContainers();
    checkAuth();
  }, []); 

  return (
    <div className="upload-container">
      <HeaderAdmin />
      <div className="main-container">
          <div className="sidebar">
            <Sidebar />
          </div>
        <div className="content">
      <div className="App">
        <h1 className="upload-title">Container Management</h1>
        {!isAuthenticated ? (
          <div>
            {/* <button onClick={handleLogin} className="buttonLogin1">
              Login with Microsoft
            </button> */}
          </div>
        ) : (
          <div>
            {/* {!userInfo || userInfo?.name ||"Admin"}(
            ) : {(
              <h2 className="user-welcome">Welcome</h2>
            )} */}

              {!userInfo ? (
                    <p>Loading user data...</p>
                  ) : (
                    <>
                      <h2 className="admin-welcome">Welcome, {userInfo.name || userInfo.preferred_username || "Admin"}!</h2>
                    </>
              )}


            {/* List Container Blob */}
            {/* <div className="container-list">
              {containers.length === 0 ? (
                <p>No containers available.</p>
              ) : (
                <div  className="container-cards">
                  {containers.map((container, index) => (
                    <div key={index} className="container-card">
                      <h4>{container}</h4>
                      <button
                        className="btn-container-action" style={{background: "linear-gradient(to right, #072ac8, #0093e9);"}}
                        onClick={() => handleManageClick(container)} // Gọi API khi nhấn Manage
                      >
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div> */}
            <div className="container-list">
            {containers.length === 0 ? (
                <p>No containers available.</p>
            ) : (
                <div className="container-cards">
                    {Array.isArray(containers) && containers.length > 0 ? (
                        containers.map((container, index) => (
                            <div key={index} className="container-card">
                                <h4>{container}</h4>
                                <button
                                    className="btn-container-action"
                                    style={{background: "linear-gradient(to right, #072ac8, #0093e9);"}}
                                    onClick={() => handleManageClick(container)} // Call API Container
                                >
                                    Manage
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Invalid data format for containers.</p>
                    )}
                </div>
            )}
        </div>
            {/* 
            Hiển thị các file trong container khi đã chọn
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
      <FooterAdmin />
    </div>
    </div>
    </div>
  );
}

export default Container;
