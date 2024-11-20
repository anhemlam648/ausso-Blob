import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../ChatBot/styleHomeChatBot/styleHome.css';
import ImageRobot from '../../assets/ImageRobot.gif'
import LogoCMCTS from '../../assets/imagesCMCTS.jfif'
import ImageCompany from '../../assets/ImageCompany.gif'
import { useNavigate } from 'react-router';
function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigator = useNavigate();
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
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Authentication check failed", error);
    }
  };
  const handleChatWeb = () => {
    navigator("/chatbotweb")
  }
  return (
    <div className="home-container">
      <HeaderClient />

      {/* Check authentication status */}
      <div className="auth-status">
        {!isAuthenticated ? (
          <div>
            {/* <p>Loading...</p> */}
          </div>
        ) : (
          <div>
            {/* Authenticated section */}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Chatbot Introduction Section */}
        <section className="home" id="home">
          <div id="particles-js"></div>
          <div className="content">
            <h2>
              Meet your AI Assistant<br /> Chat with <span>ChatBot</span>
            </h2>
            <p className='tag'>
            I am here to help you with anything you need. Ask me questions, get assistance, or simply chat with me!
            </p>
            <a href="#about" className="btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-circle-down"></i>
            </a>
          </div>
          <div className="image">
            <img draggable="false" className="tilt" src={ImageRobot} alt="ChatBot"  style={{
                marginTop:"15px", 
                width:"55%", 
                height: "auto", 
                borderRadius: "25px", 
                border: "5px", 
                padding: "10px" }}/>
          </div>
        </section>

        {/* About ChatBot Section */}
        <section className="about" id="about">
          <h2 className="heading"><h2 className="fas fa-robot"></h2><span>ChatBot</span></h2>
          <p className='tag'>
          Our chatbot is designed to provide assistance, answer your questions, and help you navigate through the platform with ease. Whether you are looking for information or need help solving an issue, always here to assist you!
          </p>
          <div className="button-group">
            <button className="btn" onClick={handleChatWeb}>Start Chatting</button>
            <button className="btn">Learn More</button>
          </div>
        </section>
        <div className="image-company">
        <img 
            draggable="false" 
            className="tilt" 
            src={ImageCompany} 
            alt="ChatBot"  
            style={{
                marginTop: "15px", 
                width: "35%", 
                height: "auto", 
                borderRadius: "25px", 
                border: "5px", 
                padding: "10px" 
            }}
            />
          </div>
        {/* About the Company Section */}
        <section className="about-company" id="about-company">
          <h2 className="heading"><i className="fas fa-building"></i>  <span>About Us</span></h2>
          <div className="row">
            <div className="image">
              <img draggable="false" className="tilt" src={LogoCMCTS} alt="Company" style={{width:"100%"}} />
            </div>
            <div className="content-company">
              <span className='title-company'>
              Comprehensive Solutions & Leadership in Expansion</span>
              <p>
              CMC Technology & Solution Corporation (CMC TS) is the #1 enterprise in Vietnam providing consulting and implementing digital transformation and security solutions for organizations and businesses. CMC TS aims to achieve a revenue of 10 trillion VND and a workforce of 3,000 employees by 2025. The company focuses on seven major solution areas (7 big moves), including: Digital Transformation, Cloud Computing, Cybersecurity, Smart Cities, Smart Manufacturing, Digital Banking and Finance, and CMC Made Solutions.
              </p>
              <div className="box-container">
                <div className="box">
                  <p style={{color:"#072ac8"}}><span> Founded: </span> 2019</p>
                  <p style={{color:"#072ac8"}}><span> Address 1: </span> Ha Noi City </p>
                  <p style={{color:"#072ac8"}}><span> Address 2: </span> Ho Chi Minh City </p>
                </div>
              </div>
              <div className="button-group">
                <button className="btn">Contact Us</button>
                <button className="btn">Learn More</button>
              </div>
            </div>
          </div>
        </section>

      </div>

      <FooterClient />
    </div>
  );
}

export default Home;
