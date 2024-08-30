import React from 'react'; // Explicitly import React
import Identity from '../components/Identity';
import './../assets/css/pages/sign.css'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";

export default function Login() {
        const navigate = useNavigate();

  return (
  <>
      <Navbar title="Login" />
      <Identity />
      <div className="container main-login-container">
        <label>Email</label>
        <input></input>
        <label>Password</label>
        <input></input>
        <button className='login'>login</button>
        <div className="part-signup">
            <p>{"Don't have an account ? "}</p>
          <button onClick={() => navigate("/signUp")}>sign up</button>
        </div>

    </div>
  </>
  )
}