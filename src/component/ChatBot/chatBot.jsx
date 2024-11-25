import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import Imageman from '../../assets/bussiness-man.png';
import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import './styleHomeChatBot/styleChat.css';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('chatbot'); // Change Tab
    const [isTabOpen, setIsTabOpen] = useState(true); 
    // const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5010/api/v1/check-auth', {
                withCredentials: true,
            });
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                fetchUserInfo(); 
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Authentication check failed', error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('http://localhost:5010/api/v1/user-info', {
                withCredentials: true,
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    };

    // const handleLogin = () => {
    //     window.location.href = 'http://localhost:5010/api/v1/login'; 
    // };

    const handleChatSubmit = async () => {
        if (message.trim() === "") return;
        setLoading(true);
        setMessage('');
        const userMessage = message;
        
        try {
            setHistory(prevHistory => [...prevHistory, { user: userMessage, bot: '...' }]);

            // Example chat request
            const chatRequest = { question: message, history: history };
            const response = await axios.post('http://localhost:5003/chat-owndata', chatRequest);

            const botResponse = response.data.answer;
            // const formattedResponse = formatLongMessage(botResponse);
            setHistory(prevHistory => [...prevHistory.slice(0, -1), { user: userMessage, bot: botResponse}]);
            // setHistory(prevHistory => [...prevHistory.slice(0, -1), { user: userMessage, bot: formattedResponse.join("/n") }]);
        } catch (error) {
            console.error('Error while submitting message:', error);
            setHistory(prevHistory => [...prevHistory.slice(0, -1), { user: userMessage, bot: "Sorry, something went wrong. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };


    // Handle chat dify
    // const handleChatSubmit = async () => {
    //     if (message.trim() === "") return;
    //     setLoading(true);
    //     setMessage('');  // Clear the input field
    //     const userMessage = message;
    //     // const formdata = new FormData();
    //     // formdata.append("file",file);
    //     // const formdata = new FormData();
    //     // formdata.append("files", file);
    //     try {
    //         // Log the request payload to ensure it's correct
    //         // console.log("Request Payload:", {
    //         //     'inputs': {},
    //         //     'query': userMessage,
    //         //     'response_mode': "blocking",
    //         //     'conversation_id': "",
    //         //     'user': "abc-123"
    //         // });
    //         setHistory(prevHistory => [...prevHistory, { user: userMessage, bot: '...' }]);
    //         const response = await axios.post('http://localhost/v1/chat-messages', {
    //             'inputs': {},  
    //             'query': userMessage,
    //             'response_mode': "blocking",
    //             'conversation_id': "",
    //             'user': "abc-123",
    //             "files": [
    //                 {
    //                   "type": "image",
    //                   "transfer_method": "remote_url",
    //                   "url": "https://img.freepik.com/premium-vector/cute-robot-mascot-logo-cartoon-character-illustration_8169-227.jpg"
    //                 }
    //               ]
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Bearer app-k63riE2SaYfVXxeocpYEjUcJ', 
    //             }
    //         });
    //         console.log("Full Response:", response);
    
    //         const botResponse = response.data.answer || "Sorry, I couldn't understand your request.";  
    //         console.log("Bot:", botResponse);
    
    //         setHistory(prevHistory => [
    //             ...prevHistory.slice(0, -1),
    //             { user: userMessage, bot: botResponse }
    //         ]);
    //     } catch (error) {
    //         console.error('Error while submitting message:', error);
    //         setHistory(prevHistory => [
    //             ...prevHistory.slice(0, -1), // Remove last item (placeholder)
    //             { user: userMessage, bot: "Sorry, something went wrong. Please try again." }
    //         ]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Handle File Dify
    // const handleFileSubmit = async () => {
    //     if (!file) return; 
    
    //     setLoading(true); 
    
    //     const formdata = new FormData();
    //     formdata.append("inputs", "{}"); 
    //     formdata.append("query", ''); 
    //     formdata.append("response_mode", "blocking");
    //     formdata.append("conversation_id", ""); 
    //     formdata.append("user", "abc-123"); 
    
    //     // Append the file to FormData
    //     formdata.append("files", file);
    
    //     // const token = 'app-1EvfwguIh20thC4yFJe6XALc'; 
    
    //     try {
    //         // Note: Don't set Content-Type header manually when using FormData
    //         const response = await axios.post('http://localhost/v1/chat-messages', formdata, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer app-XjNp3pxHLZ2AwA1ZMbVdIzAy`,
    //             },
    //             withCredentials: true, // Send cookies if required by the server
    //         });
    
    //         // Handle bot response
    //         const botResponse = response.data.answer || "Sorry, I couldn't understand your request.";
    //         setHistory(prevHistory => [
    //             ...prevHistory.slice(0, -1),
    //             { user: 'File uploaded', bot: botResponse },
    //         ]);
    //     } catch (error) {
    //         console.error('Error while submitting file:', error);
    //         setHistory(prevHistory => [
    //             ...prevHistory.slice(0, -1),
    //             { user: 'File uploaded', bot: "Sorry, something went wrong. Please try again." },
    //         ]);
    //     } finally {
    //         setLoading(false); // Hide loading spinner
    //     }
    // };
    
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFile(selectedFile);
    // };
    
    //FormatLong Message
    // const formatLongMessage = (message, maxLength = 50) => {
    //     const lines = [];
    //     for (let i = 0; i < message.length; i += maxLength) {
    //         const line = message.slice(i, i + maxLength);
    //         lines.push(i === 0 ? line : `• ${line}`); 
    //     }
    //     return lines.join("\n"); 
    // };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && message.trim() !== "") {
            handleChatSubmit();
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab); 
      };

    const toggleTab = () => {
        setIsTabOpen(!isTabOpen); // change Tab
    };
    return (
        <div className="Container-ChatBot">
            <HeaderClient />
            <div className="Wrapper-ChatBot">
                {isAuthenticated ? (
                    <div className="Chatbox">
                        <div className="Chatbox__header">
                            <h3 className='Title_ChatBot'>CMCTS Chatbot, {userInfo?.name ? userInfo.name: 'User'}</h3>
                        </div>
                        {/*
                        <div className="Chatbox__messages">
                            {history.map((msg, index) => (
                                <div key={index} className="message-container">
                                    {msg.bot && (
                                        <div className="message-bubble bot">
                                            <span className="message-content">{msg.bot}</span>
                                            <FaRobot size={18} style={{ marginRight: '10px' }} />
                                        </div>
                                    )}
                                    {msg.user && (
                                        <div className="message-bubble user">
                                            <span className="message-content">{msg.user}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div> */}
                          {/* Tab nằm ngoài Container-ChatBot */}
                            <div className={`tab-container ${isTabOpen ? 'visible' : 'hidden'}`}>
                                    <button 
                                    className={`tab-button ${activeTab === 'chatbot' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('chatbot')}
                                    >
                                    Chatbot
                                    </button>
                                    <button 
                                    className={`tab-button ${activeTab === 'chatweb' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('chatweb')}
                                    >
                                    Web Chat
                                </button>
                            </div>
                            {/* Button để mở/đóng tab */}
                            <button className="toggle-tab-btn" onClick={toggleTab}>
                                {isTabOpen ? 'Close Tabs' : 'Open Tabs'}
                            </button>
                        {activeTab === 'chatweb' && (
                            <div className="Chatbox__messages">
                                <div className="message-bubble webchat">
                                <p>Chat Web Content will be displayed here...</p>
                                    <button 
                                    className="navigate-btn"
                                    onClick={() => navigate('/chatbotweb')}
                                    >
                                    Go to Chat Web
                                    </button>
                                </div>
                            </div>
                        )}
                        { activeTab ==='chatbot' && (
                        <div className="Chatbox__messages">
                                {/* Example of chat history */}
                                {history.map((msg, index) => (
                                    <div key={index} className="message-container">
                                        {msg.bot && (
                                            <div className="message-container__icon bot">
                                                <FaRobot size={18} />
                                            </div>
                                        )}
                                
                                        {msg.bot && (
                                            <div className="message-bubble bot">
                                                <span className="message-content">{msg.bot}</span>
                                                {/* {msg.bot.split("\n").map((line, idx) => (
                                                    <p key={idx} className="formatted-line">{line}</p>
                                                ))} */}
                                            </div>
                                        )}

                                        {msg.user && (
                                            <div className="message-bubble user">
                                                <span className="message-content">{msg.user}</span>
                                            </div>
                                        )}
                                        {msg.user && (
                                            <div className="message-container__icon user">
                                                <img src={Imageman} className="user-avatar" alt="User Avatar" />
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        )}
                         { activeTab ==='chatbot' && (
                        <div className="Chatbox__footer">
                            <input
                                type="text"
                                placeholder="Gõ tin nhắn..."
                                className="chat-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button className="chat-send-btn" onClick={handleChatSubmit} 
                            disabled={loading || message.trim() === ""}>
                                <FaPaperPlane style={{ fontSize: '15px', marginRight: '5px' }}/> Send
                            </button>
                             {/* Input file for uploading an image */}
                              {/* <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            <button
                                className="file-send-btn"
                                onClick={handleFileSubmit}
                                disabled={loading || !file}
                            >
                                Send Image
                            </button>  */}
                        </div>
                         )}
                    </div>
                ) : (
                    // <div className="login-prompt">
                    //     <p className="Title1">Hello, Welcome Chat With Bot</p>
                    //     <button className="login-btn1" onClick={handleLogin}>Login with Microsoft</button>
                    // </div>
                    <div></div>
                )}
            </div>
            <FooterClient />
        </div>
    );
};


export default Chatbot;
