// src/components/Login.jsx
import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import './StyleLogin/style.css'; 
// import ImageLogin from '../../assets/backgroundLogin.jpg'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, seRememberMe] = useState("");
  useEffect(() => {
    const SaveRemember = localStorage.getItem("rememberMe") === true;
    const SaveUserName = localStorage.getItem("username");
    const SavePassword = localStorage.getItem("password");
    seRememberMe(SaveRemember);
    if (SaveRemember) {
        seRememberMe(true);
        setUsername(SaveUserName);
        setPassword(SavePassword);
      }
  }, []);
  const handleSubmit = (e) => {
    // const username = 'Admin'
    // const password = '123'
    if(e) e.preventDefault();
    if( typeof username == 'string' && typeof password == 'string'){
        if(username == 'AdminCMC' && password =='123456'){
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
              } else {
                localStorage.setItem("rememberMe", "false");
                localStorage.removeItem("username");
                localStorage.removeItem("password");
              }
            return window.location.href ='/';
        }else{
            alert("Username or Password error", username,password)
        }
    }else{
        alert("Error Handle");
    }
  };
  const handlCheckRememberme = () =>{
    seRememberMe(!rememberMe);
  } 
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h3 className="text-center mb-4">CMC TS</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              className="form-input" 
              id="username" 
              placeholder="Enter your username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              id="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-check">
            <input 
              type="checkbox" 
              className="form-checkbox" 
              id="rememberMe" 
              checked={rememberMe}
              onChange={handlCheckRememberme}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>
          <button type="submit" className="btn-submit" onClick={handleSubmit}>Login</button>
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;