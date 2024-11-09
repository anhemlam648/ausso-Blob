// src/component/Header.jsx
import { Link } from 'react-router-dom';
import '../Header/styleHeader/style.css'; 

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar" > 
      <div className="container-fluid">
        {/* Logo hoặc Tên */}
        <Link className="navbar-brand" to="/dashboard">CMCTS</Link>
        {/* <Link className="navbar-brand" to="/dashboard">CMCTS</Link> */}
        {/* Button để toggle menu trên màn hình nhỏ */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link page" aria-current="page" to="/dashboard">Home Admin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dashboard" to="/uploadfile">Upload File</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dashboard" to="/sectioncard">Section Card</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link dashboard" to="/container">Container</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
