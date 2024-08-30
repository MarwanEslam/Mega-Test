import React from 'react'; // Explicitly import React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Exam from './pages/Exam';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" exact></Navigate>} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/exam" element={<Exam />}></Route>
      </Routes>
    </Router>
 )
}

export default App
