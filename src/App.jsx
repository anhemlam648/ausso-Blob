// import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomeAdmin from './component/Dashboard/homeAdmin';
import UploadFile from './component/Dashboard/uploadFile';
import ListContainer from './component/Dashboard/container'
// import Login from './component/Login/login'
import SectionCard from './component/Dashboard/costSectionCard';
import FileContainer from './component/Dashboard/filecontainer'; 
// import ChatBot from './component/ChatBot/homeChatBot';
// import ChatBotWebTest from './component/ChatBot/chatBotWebTest';
import ChatBotWeb from './component/ChatBot/chatBotWeb';
import Chatbot from './component/ChatBot/chatBot';
import Dashboard from './component/Dashboard/Dashboard';
// import HeaderAdmin from './component/Dashboard/HeaderAdmin/HeaderAdmin';
// import FooterAdmin from './component/Dashboard/FooterAdmin/FooterAdmin';
import HomeAdmin from './component/Dashboard/homeAdmin'
import Home from './component/ChatBot/Home';
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />}>Introduction</Route> 
        <Route path='/chatbotweb' element = {<ChatBotWeb />}>ChatBotWeb</Route>
        <Route path='/chatbot' element={<Chatbot />}>ChatBot</Route> 
        {/* <Route path='/chatbotweb' element={<ChatBotWebTest />}>ChatBotWeb</Route>  */}
        {/* <Route path='/dashboard' element={<HomeAdmin />}>Home Admin</Route>  */}
        <Route path='/dashboard' element={<Dashboard />}>Home Admin</Route>
        {/* <Route path='/header' element={<HeaderAdmin/>}>HeaderAdmin</Route>
        <Route path='/footer' element={<FooterAdmin/>}>FooterAdmin</Route> */}
        {/* <Route path='/' element={<Login />}>Home</Route>  */}
        <Route path='/overview' element={<HomeAdmin />}>Overview</Route> 
        <Route path='/uploadfile' element={<UploadFile />}>Upload File</Route> 
        <Route path='/sectioncard' element={<SectionCard />}>Section Card</Route> 
        <Route path='/container' element={<ListContainer />}>Container</Route> 
        <Route path='/files/:containerName' element={<FileContainer />}>List file</Route> 
      </Routes>
    </Router>
  )
}

export default App
