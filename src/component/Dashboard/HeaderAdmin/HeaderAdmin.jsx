import './styleHeaderAdmin.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Azure Dashboard</h1>
            </div>
            <div className="header-right">
                <div className="user-info">
                    <span>Admin</span>
                    <button className="logout-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path d="M9 12.5a.5.5 0 0 1-.5-.5V10H3.707a.5.5 0 0 1-.354-.854l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.354.854H9v1a.5.5 0 0 1-.5.5z"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
