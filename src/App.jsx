// import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeAdmin from './component/Dashboard/homeAdmin';
import UploadFile from './component/Dashboard/uploadFile';
import ListContainer from './component/Dashboard/container'
// import Login from './component/Login/login'
import SectionCard from './component/Dashboard/costSectionCard';
import FileContainer from './component/Dashboard/filecontainer'; 
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<HomeAdmin />}>Home Admin</Route> 
        {/* <Route path='/' element={<Login />}>Home</Route>  */}
        <Route path='/uploadfile' element={<UploadFile />}>Upload File</Route> 
        <Route path='/sectioncard' element={<SectionCard />}>Section Card</Route> 
        <Route path='/container' element={<ListContainer />}>Container</Route> 
        <Route path='/files/:containerName' element={<FileContainer />}>List file</Route> 
      </Routes>
    </Router>
  )
}

export default App
