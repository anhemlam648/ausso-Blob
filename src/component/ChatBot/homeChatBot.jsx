// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import HeaderClient from '../HeaderClient/HeaderClient';
// import FooterClient from '../FooterClient/FooterClient';
// import './styleHomeChatBot/styleHomeChatBot.css'; 
// import { useNavigate } from 'react-router-dom';  

// function ChatBot() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [message, setMessage] = useState("");  
//   const [history, setHistory] = useState([]);  
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("chatbot");
//   const [sasUrl, setSasUrl] = useState("");  
//   const [sourceFile, setSourceFile] = useState(""); 
//   const [error, setError] = useState("");  
//   const navigate = useNavigate();  

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // Kiểm tra xem người dùng có xác thực hay không
//   const checkAuth = async () => {
//     try {
//       const responses = await axios.get("http://localhost:5010/api/v1/check-auth", {
//         withCredentials: true,
//       });
//       if (responses.data.isAuthenticated) {
//         setIsAuthenticated(true);
//         fetchUserInfo();  // Lấy thông tin người dùng nếu đã xác thực
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       console.error("Authentication check failed", error);
//     }
//   };

//   // Lấy thông tin người dùng sau khi xác thực
//   const fetchUserInfo = async () => {
//     try {
//       const responses = await axios.get("http://localhost:5010/api/v1/user-info", {
//         withCredentials: true,
//       });
//       setUserInfo(responses.data);
//     } catch (error) {
//       console.error("Failed to fetch user info", error);
//     }
//   };

//   // xử lý hơn 1000 kí tự
//   const chunkMessage = (message, chunkSize = 1000) => {
//     const chunks = [];
//     for (let i = 0; i < message.length; i += chunkSize) {
//       chunks.push(message.slice(i, i + chunkSize));
//     }
//     return chunks;
//   };

//   // Gửi yêu cầu chat tới back-end
//   const handleChatSubmit = async () => {
//     if (message.trim() === "") return; 
//     setLoading(true);
//     try {
//       const chunk = chunkMessage(message)
//       if (message.includes("send file")) {
//         const fileName = "example-file.txt";  // Giả có một tên file nào đó
//         await handleFetchSasUrl(fileName);  // Gọi để lấy SAS URL cho file
//       }
//       const chatRequest = {
//         history: history,  
//         // message: message,
//         question: chunk,
//         file_name: sourceFile,  
//       };

//       const responses = await axios.post('http://localhost:5003/chat', chatRequest, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
 
//       // Lưu lịch sử chat
//       // setHistory([...history, { user: message, bot: responses.data, file: sourceFile }]);
//       setHistory(prevHistory => [
//         ...prevHistory.slice(0, -1),  // Remove the loading state
//         { user: chunk, bot: "Sorry, something went wrong. Please try again." }
//       ]);
//       if (responses.data && responses.data.content) {
//         const botResponse = responses.data.content;
  
//         // Update chat history with bot response
//         setHistory(prevHistory => [
//           ...prevHistory.slice(0, -1),  // Remove the loading state
//           { user: chunk, bot: botResponse }
//         ]);
//       } else {
//         // Handle the case when the response format is unexpected
//         console.error("Invalid response format", responses.data);
//         setHistory(prevHistory => [
//           ...prevHistory.slice(0, -1),  // Remove the loading state
//           { user: chunk, bot: "Sorry, something went wrong. Please try again." }
//         ]);
//       }
//       handleCombieAndSummary();
//     } catch (error) {
//       console.error("Error while submitting message:", error);
//       setHistory([...history, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
//     } finally {
//       setLoading(false);
//       setMessage("");
//     }
//   };

//   // Xử lý login
//   const handleLogin = () => {
//     window.location.href = "http://localhost:5010/api/v1/login";  
//   };

//   // Xử lý gửi tin nhắn khi nhấn Enter
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && message.trim() !== "") {
//       handleChatSubmit();
//     }
//   };

//   // Chuyển tab
//   const handleTabChange = (tab) => {
//     setActiveTab(tab); 
//   };

//   // Tạo tóm tắt
//   const handleCombieAndSummary = async () => {
//     // Xây dựng payload cho API
//     const requestPayload = {
//       message: message,
//       overrides: {},   // Nếu cần, thêm đối số này
//       citation_lookup: {},  // Nếu cần
//       thought_chain: {}  // Nếu cần
//     };
  
//     setLoading(true);
  
//     try {
//       const response = await axios.post('http://localhost:5003/combie-and-summary', requestPayload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       // Xử lý dữ liệu trả về từ API, ví dụ:
//       setHistory([...history, { user: message, bot: response.data }]);
//     } catch (error) {
//       console.error("Error while requesting combie and summary:", error);
//       setHistory([...history, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
//     } finally {
//       setLoading(false);
//       setMessage("");
//     }
//   };

//     // Lấy URL SAS cho file nguồn
//     const handleFetchSasUrl = async (sourceFile) => {
//       try {
//         const response = await axios.post('http://localhost:8000/get_source_file_with_sas', {
//           source_file: sourceFile,  // Dữ liệu gửi đi trong body yêu cầu
//         });
  
//         // Nếu có URL SAS, lưu vào state
//         if (response.data.source_file_with_sas) {
//           const fileUrl = response.data.source_file_with_sas;
//           const shortFileName = 'File_' + sourceFile.split('/').pop();  // Tạo tên tệp ngắn gọn
//           setSasUrl(fileUrl);
//           setSourceFile(shortFileName); 
//         } else {
//           setError('No SAS URL returned');
//         }
//       } catch (err) {
//         console.error('Error fetching SAS URL:', err);
//         setError('An error occurred while fetching SAS URL');
//       }
//     };
//   return (
//     <div className="chatbot-container">
//       <HeaderClient />
//       <div className="chat-wrapper">
//         {isAuthenticated ? (
//           <div className="chat-box">
//             <div className="chat-header">
//               <div 
//                 className={`chat-tab ${activeTab === 'chatbot' ? 'active' : ''}`}
//                 onClick={() => handleTabChange('chatbot')}
//               >
//                 Chat Bot
//               </div>
//               <div 
//                 className={`chat-tab ${activeTab === 'web' ? 'active' : ''}`}
//                 onClick={() => handleTabChange('web')}
//               >
//                 Chat Web
//               </div>
//             </div>

//             {/* Nội dung tab ChatBot */}
//             {activeTab === 'chatbot' && (
//               <div className="chat-content">
//                 <div className="chat-title">
//                   <h4 style={{color:"#00FFFF"}} >Hello, {userInfo?.name ?? 'User'}</h4>
//                   <p className='text-bot' style={{color: "#00FFFF"}} >Start chatting with Chat Bot</p>
//                 </div>

//                 {/* Chat history */}
//                 <div className="chat-history">
//                   {history.map((msg, index) => (
//                     <div key={index} className="message">
//                       <div className="message-bubble user">
//                         <strong>User:</strong> <span>{msg.user}</span>
//                       </div>
//                       {/* <div className="message-bubble bot">
//                         <strong>Bot:</strong> <span>{msg.bot}</span>
//                       </div> */}
//                       {/* <div className="message-bubble bot">
//                         <strong>Bot:</strong> <span>{msg.bot}</span>
//                         {msg.file && (
//                           <div>
//                             <strong>File Attached:</strong> <span>{msg.file}</span>
//                           </div>
//                         )}
//                     </div> */}
//                     </div>
//                   ))}
//                 </div>

//                  {/* Hiển thị SAS URL và error nếu có */}
//                  {sasUrl && (
//                   <div className="sas-url">
//                     <strong>File URL (SAS): </strong>
//                     <a href={sasUrl} target="_blank" rel="noopener noreferrer">{sasUrl}</a>
//                   </div>
//                 )}
//                 {error && (
//                   <div className="error-message" style={{color: "red"}}>
//                     <strong>Error: </strong>{error}
//                   </div>
//                 )}

//               {/* Input area */}
//               <div className="input-area">
//                   <input
//                     type="text"
//                     className="input-field"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}  
//                     placeholder="Type your message"
//                     onKeyDown={handleKeyPress}
//                     autoFocus
//                   />
//                   <button
//                     className="send-btn"
//                     onClick={handleChatSubmit}
//                     disabled={loading || message.trim() === ""}
//                   >
//                     {loading ? 'Sending...' : 'Send Messenger'}
//                   </button>
//                   <button
//                     className="combie-btn"
//                     onClick={handleCombieAndSummary}
//                     disabled={loading || message.trim() === ""}
//                   >
//                     {loading ? 'Processing...' : 'Generate Summary'}
//                   </button>
//                   {/* <button
//                     className="loadData-btn"
//                     onClick={handleLoadData}
//                     disabled={loading || message.trim() === ""}
//                   >
//                     {loading ? 'Sending...' : 'Send Messenger'}
//                   </button> */}
//                 </div>
//               </div>
//             )}
        
//             {/* Nội dung tab Chat Web */}
//             {activeTab === 'web' && (
//               <div className="chat-web-content">
//                 <p>Chat Web Content will be displayed here...</p>
//                 <button 
//                   className="navigate-btn"
//                   onClick={() => navigate('/chatbotweb')}
//                 >
//                   Go to Chat Web
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="login-prompt">
//             <p className='Title1'>Hello, Welcome Chat With Bot</p>
//             <button className="login-btn" onClick={handleLogin}>Login with Microsoft</button>
//           </div>
//         )}
//       </div>
//       <FooterClient />
//     </div>
//   );
// }

// export default ChatBot;
