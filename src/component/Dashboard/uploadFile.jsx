// import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import './StyleDashboard/styleFile.css'
function Uploadfile(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    // const [azureCostData, setAzureCostData] = useState(null);
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
      const handleLogin = () => {
        window.location.href = "http://localhost:5010/api/v1/login";
      };
    
      // Xử lý logout
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

      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

      const handleFileUpload = async () => {
        if (!file) {
          setUploadStatus("No file selected!");
          return;
        }
      
        const formData = new FormData();
        formData.append("files", file);
        formData.append("container", "upload-images");
        
        
        // console.log("Form Data being sent:", formData);
        console.log('FormData:', formData);
        try {
          setUploadStatus("Uploading...");
      
      const response = await axios.post("http://localhost:5010/api/v1/upload-file-blob", formData, {
            withCredentials: true,
          });
      
          // Kiểm tra phản hồi
          if (response.data.message === "Files uploaded successfully") {
            setUploadStatus("File uploaded successfully!");
            // In thông tin file upload
            response.data.files.forEach((file) => {
              console.log(`File uploaded: ${file.filename}`);
              console.log(`SAS URL: ${file.sas_url}`);
            });
          } else {
            setUploadStatus("Upload failed.");
          }
        } catch (error) {
          console.error("Upload failed", error);
          setUploadStatus("Upload failed!");
        }
      };
      const handleDeleteUpload = async () => {
        if (!file) {
          setUploadStatus("No file selected!");
          return;
        }
      
        const containerName = "upload-images"; 
        const fileName = file.name; 
      
        // Xử lý DELETE request
        try {
          setUploadStatus("Deleting...");
      
          const response = await axios.delete(
            `http://localhost:5010/api/v1/delete-files?container=${containerName}&blob=${fileName}`,
            { withCredentials: true }
          );
      
          if (response.data.message) {
            setUploadStatus(response.data.message); // In thông báo xóa thành công
          }
           else {
            setUploadStatus("Delete failed.");
          }
        } catch (error) {
          const errorMessage = `Oops! The file "${fileName}" could not be found in the container. Please check and try again.`;
          setUploadStatus(errorMessage);
          console.error("Delete failed with error: ", error);
          // setUploadStatus("Delete failed!");
          // if (response && response.status === 404) {
          //   setUploadStatus(`File "${file.name}" not found in the container.`);
          // } else {
          //   // Lỗi khác (500, hoặc lỗi kết nối)
          //   setUploadStatus("Delete failed!"); 
          // }
          // const errorMessage = "Delete failed file not found in the container .";
          // console.error("Delete failed", error);
        }
      };
      // const fetchAzureCost = async () => {
      //   try {
      //     const response = await axios.get("http://localhost:5010/api/v1/get-cost-management");
      //     if (response.data) {
      //       setAzureCostData(response.data); // Lưu dữ liệu chi phí vào state
      //     }
      //   } catch (error) {
      //     console.error("Failed to fetch Azure cost data", error);
      //   }
      // };
      useEffect(() => {
        checkAuth();
        // fetchAzureCost();
      }, []);
      return (
        <div className="upload-container">
        <Header />
        <div className="App">
          <h1 className="Title">Upload File</h1>
          {!isAuthenticated ? (
            <div>
              <button onClick={handleLogin} className="buttonLogin1 ">Login with Microsoft</button>
            </div>
          ) : (
            <div>
            {!userInfo ? (
              <p>Loading user data...</p>
            ) : (
              <>
            <h2 className="Title_User">Welcome</h2>
                {/* <h2>Welcome, {userInfo.name || userInfo.preferred_username || "User"}!</h2> */}
                {/* <p>User Info: {JSON.stringify(userInfo)}</p> */}
              </>
            )}
             
             {/* Đăng xuất */}
            <button onClick={handleLogout} className="buttonLogout">Logout</button>
             
            {/* Upload và Delete file trên Blob */}
            <div className="upload-section">
              <input type="file" onChange={handleFileChange} />
              <div className="upload-buttons-container">
              <button onClick={handleFileUpload} className="upload-button">Upload</button>
              <button onClick={handleDeleteUpload} className="delete-button">Delete File</button>
              {/* {uploadStatus && <p>{uploadStatus}</p>} */}
              {uploadStatus && (
                  <p className={`upload-status ${uploadStatus.toLowerCase().replace(' ', '-')}`}>
                      {uploadStatus}
                  </p>
              )}
              </div>
            </div>
          </div>
          )}
        </div>
        <Footer />
        </div>
      );
    }
export default Uploadfile;