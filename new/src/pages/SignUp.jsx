import React from 'react'; // Explicitly import React
import Identity from '../components/Identity';
import './../assets/css/pages/sign.css'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  return (
  <>
      <Navbar title="Sign up" />
      <Identity />
      <div className="container main-login-container">
        <label>Username</label>
        <input></input>
        <label>Email</label>
        <input></input>
        <label>Password</label>
        <input></input>
        <button className='login'>signup</button>
        <div className="part-signup">
            <p>{"have already an account ? "}</p>
            <button onClick={() => navigate("/login")}>log in</button>
        </div>

    </div>
  </>
  )
}