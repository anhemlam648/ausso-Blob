import HeaderClient from '../HeaderClient/HeaderClient';
import FooterClient from '../FooterClient/FooterClient';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../ChatBot/styleHomeChatBot/styleHome.css';
import ImageRobot from '../../assets/ImageRobot.gif'
import LogoCMCTS from '../../assets/imagesCMCTS.jfif'
import ImageCompany from '../../assets/ImageCompany.gif'
function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              I am here to help you with anything you need. Ask me questions, get assistance, or just chat with me!
            </p>
            <a href="#about" className="btn">
              <span>Learn More</span>
              <i className="fas fa-arrow-circle-down"></i>
            </a>
          </div>
          <div className="image">
            <img draggable="false" className="tilt" src={ImageRobot} alt="ChatBot"  style={{marginTop:"15px", width:"50%"}}/>
          </div>
        </section>

        {/* About ChatBot Section */}
        <section className="about" id="about">
          <h2 className="heading"><h2 className="fas fa-robot"></h2><span>ChatBot</span></h2>
          <p className='tag'>
            Our AI-powered chatbot is designed to provide assistance, answer your questions, and help you navigate through the platform easily. Whether you are looking for information or need help solving an issue, I am here to assist you!
          </p>
          <div className="button-group">
            <button className="btn">Start Chatting</button>
            <button className="btn">Learn More</button>
          </div>
        </section>
        <div className="image-company">
            <img draggable="false" className="tilt" src={ImageCompany} alt="ChatBot"  style={{marginTop:"15px", width:"35%"}}/>
          </div>
        {/* About the Company Section */}
        <section className="about-company" id="about-company">
          <h2 className="heading"><i className="fas fa-building"></i>  <span>Về Chúng Tôi</span></h2>
          <div className="row">
            <div className="image">
              <img draggable="false" className="tilt" src={LogoCMCTS} alt="Company" style={{width:"100%"}} />
            </div>
            <div className="content-company">
              <span className='title-company'>
              GIẢI PHÁP TỔNG THỂ & DẪN ĐẦU VÀ MỞ RỘNG</span>
              <p>
              Tổng Công ty Công nghệ & Giải pháp CMC (CMC TS) là TOP 1 Doanh nghiệp tư vấn, triển khai các giải pháp Chuyển đổi số và Bảo mật cho tổ chức, doanh nghiệp tại Việt Nam. CMC TS đặt mục tiêu vào năm 2025 đạt mốc doanh thu 10 nghìn tỷ đồng và quy mô nhân sự 3000 người. Công ty tập trung vào các 7 mảng giải pháp (7 big moves) gồm: Chuyển đổi số, Điện toán đám mây, Bảo mật, Thành phố thông minh, Sản xuất thông minh, Ngân hàng và Tài chính số, Giải pháp Made by CMC.
              </p>
              <div className="box-container">
                <div className="box">
                  <p><span> Thành Lập: </span> 2020</p>
                  <p><span> Chi Nhánh: </span> TP.Hà Nội, TP. Hồ Chí Minh</p>
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
