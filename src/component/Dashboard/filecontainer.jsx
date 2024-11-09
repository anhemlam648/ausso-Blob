import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StyleDashboard/styleFile.css';

function FileContainer() {
  const { containerName } = useParams(); 
  const [files, setFiles] = useState([]); 
  const [selectedFiles, setSelectedFiles] = useState([]);  // State storage
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [downloadUrls, setDownloadUrls] = useState([]);
  // check user
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

  // Fetch list file in container
  const fetchFilesInContainer = async () => {
    try {
      const response = await axios.get("http://localhost:5010/api/v1/get-blob", {
        params: { container: containerName },
      });
      if (response.data && response.data.files) {
        setFiles(response.data.files);  
      }
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  // Lấy danh sách các file đã chọn (tích checkbox)
  const handleCheckboxChange = (fileName) => {
    setSelectedFiles((prevSelected) => {
      if (prevSelected.includes(fileName)) {
        return prevSelected.filter(file => file !== fileName);  
      } else {
        return [...prevSelected, fileName];  
        
      }
    });
  };


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
    const handleDownload = async () => {
        try {
          if (selectedFiles.length === 0) {
            alert("Please select files to download.");
            return;
          }
      
          const downloadLinks = [];
      
          // for file
          for (const file of selectedFiles) {
            // handle url
            const response = await axios.get(`http://localhost:5010/api/v1/download-files`, {
              params: { container: containerName, blob: file },
              withCredentials: true,  // 
            });
      
            // Get URL
            const downloadUrl = response.data.url;
      
            if (downloadUrl) {
              // Add URL 
              downloadLinks.push({
                fileName: file,
                url: downloadUrl
              });
            }
          }
          setDownloadUrls(downloadLinks);  // save State
        } catch (error) {
          console.error("Download failed", error);
        }
      };
  // Delete selected file
  const handleDelete = async () => {
    try {
      if (selectedFiles.length === 0) {
        alert("Please select files to delete.");
        return;
      }
      // Handle file
      selectedFiles.forEach(async (file) => {
        await axios.delete(`http://localhost:5010/api/v1/delete-files?container=${containerName}&blob=${file}`, 
        //   data: { file, container: containerName },
            { withCredentials: true },
        );
      });
      // Update list file persent
      fetchFilesInContainer();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // useEffect Check
  useEffect(() => {
    checkAuth();
    fetchFilesInContainer(); // Fetch files get URL
  }, [containerName]); //reload API

  return (
    <div className="upload-container">
      <Header />
      <div className="App">
        <h1 className="Title">Files in {containerName}</h1>
        {!isAuthenticated ? (
          <div>
            <button onClick={() => window.location.href = "http://localhost:5010/api/v1/login"} className="buttonLogin">
              Login with Microsoft
            </button>
          </div>
        ) : (
          <div>
            {/* Show file in container */}
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
              </div>
              
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FileContainer;
