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
//   const [files, setFiles] = useState([]);  // State lưu danh sách các file khi nhấn vào Manage
//   const [selectedContainer, setSelectedContainer] = useState(null);  // Container đã chọn
  const navigate = useNavigate();
  // Kiểm tra tính xác thực người dùng
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/check-auth", {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        fetchUserInfo(); // Fetch thông tin người dùng khi đã đăng nhập
        fetchContainers(); // Fetch containers sau khi đã xác thực
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check failed", error);
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
  const fetchContainers = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/get-all-container", {
        withCredentials: true,
      });
      if (response.data && response.data.container) {
        setContainers(response.data.container); // Lưu danh sách containers vào state
      }
    } catch (error) {
      console.error("Failed to fetch containers", error);
    }
  };

  // Xử lý đăng nhập
  // const handleLogin = () => {
  //   window.location.href = "http://localhost:5010/api/v1/login";
  // };

  const handleManageClick = (containerName) => {
    // Điều hướng đến trang hiển thị files của container
    navigate(`/files/${containerName}`); // Sử dụng navigate thay vì history.push
  };

  // useEffect để kiểm tra xác thực khi component được mount
  useEffect(() => {
    checkAuth();
  }, []); // Chỉ gọi checkAuth khi component được render lần đầu

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
            <div className="container-list">
              {containers.length === 0 ? (
                <p>No containers available.</p>
              ) : (
                <div className="container-cards">
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
