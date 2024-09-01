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
      <div className="container main-sign-container">
        <label>Email</label>
        <input></input>
        <label>Password</label>
        <input></input>
        <button className='custom-btn'>Login</button>
        <div className='part-sign'>
        <div className="sign-text">
          {"Don't have an account"}
        </div>
        <button className="custom-btn" onClick={() => navigate("/signUp")}>sign up</button>
        </div>

    </div>
  </>
  )
}