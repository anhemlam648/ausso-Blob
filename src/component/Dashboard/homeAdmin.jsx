// import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './StyleDashboard/styleHomeAdmin.css'
function AdminDashboard(){
    return(
        <div className="home-container">
            <Header />
            <h2 className="Title_User">Hello Welcome Come Admin</h2>
            <Footer />
        </div>
    )
 
}
export default AdminDashboard;