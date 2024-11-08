// import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatAPI from './component/ChatAPI';
import Dashboard from './component/Dashboard/dashboard';
import Login from './component/Login/login'
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<ChatAPI />}>Home</Route> 
        <Route path='/login' element={<Login />}>Home</Route> 
        <Route path='/dashboard' element={<Dashboard />}>Home</Route> 
      </Routes>
    </Router>
  )
}

export default App
