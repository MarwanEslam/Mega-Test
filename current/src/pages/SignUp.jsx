import React from 'react'; // Explicitly import React
import Identity from '../components/Identity';
import './../assets/css/pages/sign.css'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
  <>
      <Navbar title="Sign Up" />
      <Identity />
      <div className="container main-sign-container">
        <label>Username</label>
        <input></input>
        <label>Email</label>
        <input></input>
        <label>Password</label>
        <input></input>
        <button className='custom-btn'>Sign Up</button>
        <div className="part-sign">
            {"Have already an account ? "}
            <button onClick={() => navigate("/login")}>login</button>
        </div>

    </div>
  </>
  )
}