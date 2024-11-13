import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams để lấy containerName từ URL
import HeaderAdmin from './HeaderAdmin/HeaderAdmin'
import FooterAdmin from "./FooterAdmin/FooterAdmin";
import Sidebar from "./Sidebar/SiderbarAdmin";
import './StyleDashboard/styleFile.css';
import { useNavigate } from "react-router-dom";

function FileContainer() {
  const { containerName } = useParams(); 
  const [files, setFiles] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]);  // State để lưu các file đã chọn
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [downloadUrls, setDownloadUrls] = useState([]);
  // Kiểm tra tính xác thực người dùng
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/check-auth", {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check failed", error);
    }
  };

  // Fetch danh sách file trong container
  const fetchFilesInContainer = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/get-blob", {
        params: { container: containerName },
      });
      if (response.data && response.data.files) {
        setFiles(response.data.files);  // Lưu danh sách file vào state
      }
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  // Lấy danh sách các file đã chọn (tích checkbox)
  const handleCheckboxChange = (fileName) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileName)) {
        return prevSelected.filter(file => file !== fileName);  // Nếu đã chọn thì bỏ chọn
      } else {
        return [...prevSelected, fileName];  
        
      }
    });
  };

//   // Tải xuống các file đã chọn
//   const handleDownload = async () => {
//     try {
//       if (selectedFiles.length === 0) {
//         alert("Please select files to download.");
//         return;
//       }
//       // Gọi API hoặc logic xử lý download các file
//       selectedFiles.forEach(async (file) => {
//         // Giả sử API trả về URL của file để tải xuống
//         // const fileResponse = await axios.get(`http://localhost:5010/api/v1/download`, {
//         //   params: { file: file, container: containerName },
//         //   responseType: 'blob',  // Đảm bảo dữ liệu trả về là blob
//         // });
//         const response = await axios.delete(
//             `http://localhost:5010/api/v1/download-files?container=${containerName}&blob=${file}`,
//             { withCredentials: true }
//           );
//         const blob = new Blob([response.data], { type: 'application/octet-stream' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = file;  // Tên file sẽ là tên của file từ response
//         link.click();
//       });
//     } catch (error) {
//       console.error("Download failed", error);
//     }
//   };

    // const handleDownload = async () => {
    //     try {
    //     if (selectedFiles.length === 0) {
    //         alert("Please select files to download.");
    //         return;
    //     }
    
    //     // Lặp qua từng file đã chọn và lấy URL download
    //     for (const file of selectedFiles) {
    //         // Gọi API để lấy URL tải file
    //         const response = await axios.get(`http://localhost:5010/api/v1/download-files`, {
    //         params: { container: containerName, blob: file },
    //         withCredentials: true,  // Đảm bảo cookie hoặc thông tin đăng nhập được gửi cùng
    //         });
    
    //         const downloadUrl = response.data.url;  // Lấy URL trả về từ API
    
    //         // Tạo link để tải file
    //         const link = document.createElement('a');  
    //         link.href = downloadUrl;  // Gán URL tải file
    //         link.download = file;  // Tên file khi tải xuống
    //         link.click();  // Kích hoạt sự kiện tải file
    //     }
    
    //     } catch (error) {
    //     console.error("Download failed", error);
    //     }
    // };
    const handleBackTo = () =>{
        navigate(`/container`);
    }
    const handleDownload = async () => {
        try {
          if (selectedFiles.length === 0) {
            alert("Please select files to download.");
            return;
          }
      
          // Mảng để lưu các URL download
          const downloadLinks = [];
      
          // Lặp qua từng file đã chọn và lấy URL download
          for (const file of selectedFiles) {
            // Gọi API để lấy URL tải file
            const response = await axios.get(`http://localhost:5010/api/v1/download-files`, {
              params: { container: containerName, blob: file },
              withCredentials: true,  // 
            });
      
            // Lấy URL download từ phản hồi API
            const downloadUrl = response.data.url;
      
            if (downloadUrl) {
              // Thêm URL vào mảng downloadLinks
              downloadLinks.push({
                fileName: file,
                url: downloadUrl
              });
            }
          }
          setDownloadUrls(downloadLinks);  // Giả sử bạn có state downloadUrls để lưu trữ danh sách các URL
        } catch (error) {
          console.error("Download failed", error);
        }
      };
  // Xóa các file đã chọn
  const handleDelete = async () => {
    try {
      if (selectedFiles.length === 0) {
        alert("Please select files to delete.");
        return;
      }
      // Gọi API hoặc logic xử lý xóa các file
      selectedFiles.forEach(async (file) => {
        await axios.delete(`http://localhost:5010/api/v1/delete-files?container=${containerName}&blob=${file}`, 
        //   data: { file, container: containerName },
            { withCredentials: true },
        );
      });
      // Sau khi xóa xong, cập nhật lại danh sách file
      fetchFilesInContainer();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // useEffect để kiểm tra 
  useEffect(() => {
    checkAuth();
    fetchFilesInContainer(); // Fetch files khi đã xác thực và container đã được lấy từ URL
  }, [containerName]); // Khi containerName change, gọi lại API

  return (
    <div className="upload-container">
      <HeaderAdmin />
      <div className="main-container">
          <div className="sidebar">
            <Sidebar />
          </div>
        <div className="content"></div>
      <div className="App1">
        <h1 className="Title">Files in {containerName}</h1>
        {!isAuthenticated ? (
          <div>
            <button onClick={() => window.location.href = "http://localhost:5010/api/v1/login"} className="buttonLogin1">
              Login with Microsoft
            </button>
          </div>
        ) : (
          <div>
            {/* Hiển thị các file trong container */}
            {files.length === 0 ? (
              <p>No files available.</p>
            ) : (
              <div>
                <ul>
                  {files.map((file, index) => (
                    <li key={index} className="file-item">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(file)}
                        checked={selectedFiles.includes(file)}
                      />
                      <span>{file}</span>
                    </li>
                  ))}
                </ul>
                <div className="file-actions">
                  <button onClick={handleDownload} className="btn-action">Download Link File Selected</button>
                  <button onClick={handleDelete} className="btn-action">Delete Selected</button>
                </div>
                <div>
                    {downloadUrls.length > 0 && (
                        <div className="download-links">
                        <h3>Download Links</h3>
                        <ul>
                            {downloadUrls.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} download={link.fileName}>
                                {link.fileName}
                                </a>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>
              </div>
            )}
          </div>
        )}
        <button onClick={handleBackTo} className="btn-back">Back To</button>
      </div>
      <FooterAdmin />
    </div>
    </div>
  );
}

export default FileContainer;
