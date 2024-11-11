import { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './styleHomeChatBot/styleHomeChatBot.css';
import { useNavigate } from 'react-router-dom';

function ChatBotWeb() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState("");  
  const [history, setHistory] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot'); // chuyển tab
  const [sasUrl, setSasUrl] = useState("");  
  const [sourceFile, setSourceFile] = useState(""); 
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  // Kiểm tra xem người dùng có xác thực hay không
  const checkAuth = async () => {
    try {
      const responses = await axios.get("http://localhost:5010/api/v1/check-auth", {
        withCredentials: true,
      });
      if (responses.data.isAuthenticated) {
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
      const responses = await axios.get("http://localhost:5010/api/v1/user-info", {
        withCredentials: true,
      });
      setUserInfo(responses.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  // Xử lý gửi yêu cầu chat tới back-end
  // const handleChatSubmit = async () => {
  //   if (message.trim() === "") return;  // Don't send empty messages
  //   setLoading(true);
  
  //   try {
  //     // Check for file sending scenario
  //     if (message.includes("send file")) {
  //       const fileName = "example-file.txt"; // Dummy file name
  //       await handleFetchSasUrl(fileName);   // Call to get the SAS URL
  //       return;  // Exit here if handling a file
  //     }
  
  //     // Prepare chat request
  //     const chatRequest = {
  //       history: history,
  //       question: message,
  //       file_name: sourceFile,  // If a file is included
  //     };
  
  //     // Make the API request
  //     const response = await axios.post('http://localhost:5003/chat-with-web', chatRequest, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       timeout: 25000,  // Timeout set to 20 seconds
  //       maxRedirects: 5,
  //     });
  
  //     // Extract the content from the response (based on your response structure)
  //     if (response.data && response.data.content) {
  //       const botResponse = response.data.content;  // Changed from 'message' to 'content'
  
  //       // Add the bot's response to the chat
  //       const botResponseDiv = document.createElement('div');
  //       botResponseDiv.className = 'bot';
  //       botResponseDiv.innerHTML = 'Bot: ' + botResponse;
  
  //       // Append the response to the chat history
  //       document.querySelector('.chat-history').appendChild(botResponseDiv);
  
  //       // Update history state
  //       setHistory(prevHistory => [...prevHistory, { user: message, bot: botResponse }]);
  
  //     } else {
  //       // Handle the case when the response format is unexpected
  //       console.error("Invalid response format", response.data);
  //       setHistory(prevHistory => [...prevHistory, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
  //     }
  
  //   } catch (error) {
  //     // Handle any errors that occur during the API call
  //     console.error("Error while submitting message:", error);
  //     setHistory(prevHistory => [...prevHistory, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
  //   } finally {
  //     // Reset loading state and clear input field
  //     setLoading(false);
  //     setMessage("");  
  //   }
  // };

  // Xử lý chat
  // const handleChatSubmit = async () => {
  //   if (message.trim() === "") return;  // Don't send empty messages
  //   setLoading(true);
  
  //   try {
  //     // Check for file sending scenario
  //     if (message.includes("send file")) {
  //       const fileName = "example-file.txt"; // Dummy file name
  //       await handleFetchSasUrl(fileName);   // Call to get the SAS URL
  //       return;  // Exit here if handling a file
  //     }
  
  //     // Prepare chat request
  //     const chatRequest = {
  //       history: history,
  //       question: message,
  //       file_name: sourceFile,  // If a file is included
  //     };
  
  //     // Make the API request
  //     const response = await axios.post('http://localhost:5003/chat-with-web', chatRequest, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       timeout: 25000,  // Timeout set to 25 seconds
  //       maxRedirects: 5,
  //     });
  
  //     // Extract the content from the response (based on your response structure)
  //     if (response.data && response.data.content) {
  //       const botResponse = response.data.content;  // Changed from 'message' to 'content'
  
  //       // Add the bot's response to the chat
  //       // handleCombieAndSummary();
  //       setHistory(prevHistory => [...prevHistory, { user: message, bot: botResponse }]);
  //     } else {
  //       // Handle the case when the response format is unexpected
  //       console.error("Invalid response format", response.data);
  //       setHistory(prevHistory => [...prevHistory, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
  //     }
  
  //   } catch (error) {
  //     // Handle any errors that occur during the API call
  //     console.error("Error while submitting message:", error);
  //     setHistory(prevHistory => [...prevHistory, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
  //   } finally {
  //     // Reset loading state and clear input field
  //     setLoading(false);
  //     setMessage("");  
  //   }
  // };

  //xử lý chunk quá dài hơn 1000 kí tự
  const chunkMessage = (message, chunkSize = 1000) => {
    const chunks = [];
    for (let i = 0; i < message.length; i += chunkSize) {
      chunks.push(message.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleChatSubmit = async () => {
    if (message.trim() === "") return;  // Don't send empty messages
    
    // Immediately add the user's message to the chat history
      // Add loading state
  
    setLoading(true);
    setMessage("");  // Clear input field
    const userMessage = message;
    try {
      const chunks = chunkMessage(message);
      // Check for file sending scenario
      if (message.includes("send file")) {
        const fileName = "example-file.txt"; // Dummy file name
        await handleFetchSasUrl(fileName);   // Call to get the SAS URL
        return;  // Exit here if handling a file
      }
    
      // Prepare chat request
      for (const chunk of chunks) {
      const chatRequest = {
        history: history,
        // question: userMessage,
        question: chunk,
        file_name: sourceFile,  // If a file is included
      };
     
      setHistory(prevHistory => [...prevHistory, { user: userMessage, bot: "..." }]);
  
      // Make the API request
      const response = await axios.post('http://localhost:5003/chat-with-web', chatRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000,  // Timeout set to 25 seconds
        maxRedirects: 5,
      });
    //  handleCombieAndSummary();
      // Extract the content from the response (based on your response structure)
      if (response.data && response.data.content) {
        const botResponse = response.data.content;
        // Update chat history with bot response
        setHistory(prevHistory => [
          ...prevHistory.slice(0, -1),  // Remove the loading state
          { user: chunk, bot: botResponse }
        ]);
      } else {
        // Handle the case when the response format is unexpected
        console.error("Invalid response format", response.data);
        setHistory(prevHistory => [
          ...prevHistory.slice(0, -1),  // Remove the loading state
          { user: chunk, bot: "Sorry, something went wrong. Please try again." }
        ]);
      }
    }
  
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error while submitting message:", error);
      setHistory(prevHistory => [
        ...prevHistory.slice(0, -1),  // Remove the loading state
        { user: userMessage, bot: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };
  // Xử lý login
  const handleLogin = () => {
    window.location.href = "http://localhost:5010/api/v1/login";  
  };

  // Xử lý gửi tin nhắn khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim() !== "") {
      handleChatSubmit();
    }
  };

  // Chuyển tab
  const handleTabChange = (tab) => {
    setActiveTab(tab); 
  };

  // Tạo tóm tắt
  const handleCombieAndSummary = async () => {
    // Xây dựng payload cho API
    const requestPayload = {
      message: message,
      overrides: {},   // Nếu cần, thêm đối số này
      citation_lookup: {},  // Nếu cần
      thought_chain: {}  // Nếu cần
    };
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5003/combie-and-summary', requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      });
      
  
      // Xử lý dữ liệu trả về từ API, ví dụ:
      setHistory([...history, { user: message, bot: response.data }]);
    } catch (error) {
      console.error("Error while requesting combie and summary:", error);
      setHistory([...history, { user: message, bot: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // Lấy URL SAS cho file nguồn
  const handleFetchSasUrl = async (sourceFile) => {
    try {
      const response = await axios.post('http://localhost:8000/get_source_file_with_sas', {
        source_file: sourceFile,  // Dữ liệu gửi đi trong body yêu cầu
      });

      // Nếu có URL SAS, lưu vào state
      if (response.data.source_file_with_sas) {
        const fileUrl = response.data.source_file_with_sas;
        const shortFileName = 'File_' + sourceFile.split('/').pop();  // Tạo tên tệp ngắn gọn
        setSasUrl(fileUrl);
        setSourceFile(shortFileName); 
      } else {
        setError('No SAS URL returned');
      }
    } catch (err) {
      console.error('Error fetching SAS URL:', err);
      setError('An error occurred while fetching SAS URL');
    }
  };
  return (
    <div className="chatbot-container">
      <HeaderClient />
      <div className="chat-wrapper">
        {isAuthenticated ? (
          <div className="chat-box">
            <div className="chat-header">
              {/* Tab ChatBot */}
              <div 
                className={`chat-tab ${activeTab === 'web' ? 'active' : ''}`}
                onClick={() => handleTabChange('web')}
              >
                Chat Bot
              </div>
              {/* Tab Chat Web */}
              <div 
                className={`chat-tab ${activeTab === 'chatbot' ? 'active' : ''}`}
                onClick={() => handleTabChange('chatbot')}
              >
                Chat Web
              </div>
            </div>

            {/* Nội dung tab ChatBot */}
            {activeTab === 'chatbot' && (
              <div className="chat-content">
                <div className="chat-title">
                  <h4 style={{color:"#0056b3"}} >Hello, {userInfo?.name ?? 'User'}</h4>
                  <p className='text-web' style={{color:"#0056b3"}}>Start chatting with Chat Web</p>
                </div>

                {/* Chat history */}
                <div className="chat-history">
                  {history.map((msg, index) => (
                    <div key={index} className="message">
                      <div className="message-bubble user">
                        <strong>User:</strong> <span>{msg.user}</span>
                      </div>
                      <div className="message-bubble bot">
                        <strong>Bot:</strong> <span>{msg.bot}</span>
                      </div>
                    </div>
                  ))}
                </div>
                  {/* Hiển thị SAS URL và error nếu có */}
                  {sasUrl && (
                  <div className="sas-url">
                    <strong>File URL (SAS): </strong>
                    <a href={sasUrl} target="_blank" rel="noopener noreferrer">{sasUrl}</a>
                  </div>
                )}
                {error && (
                  <div className="error-message" style={{color: "red"}}>
                    <strong>Error: </strong>{error}
                  </div>
                )}
                {/* Input area */}
                <div className="input-area">
                  <input
                    type="text"
                    className="input-field"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}  
                    placeholder="Type your message"
                    onKeyDown={handleKeyPress}
                    autoFocus
                  />
                  <button
                    className="send-btn"
                    onClick={handleChatSubmit}
                    disabled={loading || message.trim() === ""}
                  >
                    {loading ? 'Sending...' : 'Send Messenger'}
                  </button>
                  
                  <button
                    className="combie-btn"
                    onClick={handleCombieAndSummary}
                    disabled={loading || message.trim() === ""}
                  >
                    {loading ? 'Processing...' : 'Generate Summary'}
                  </button>
                 
                </div>
              </div>
            )}

            {/* Nội dung tab Chat Bot */}
            {activeTab === 'web' && (
              <div className="chat-web-content">
                <p>Chat Web Content will be displayed here...</p>
                <button 
                  className="navigate-btn"
                  onClick={() => navigate('/')}
                >
                  Go to Chat Bot
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="login-prompt">
            <p className='Title1'>Hello, Welcome Chat With Bot</p>
            <button className="login-btn" onClick={handleLogin}>Login with Microsoft</button>
          </div>
        )}
      </div>
      <FooterClient />
    </div>
  );
}

export default ChatBotWeb;
