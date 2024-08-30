import React from 'react'; // Explicitly import React
import './../assets/css/pages/home.css'
import Identity from '../components/Identity';
import { useNavigate } from "react-router-dom";
export default function Home() {
        const navigate = useNavigate();
  return (
    <div className='main-home-container'>
      <Identity />
      <div className='main-info center-content-y'>
        <div className="info">
        <h2>Hello Name</h2>
        <h2>Your Passing Score Is 75%</h2>
        </div>
        <button onClick={() => navigate("/exam")}>
          <h4>Ready Start</h4>
        </button>
      </div>
    </div>

  )
}
