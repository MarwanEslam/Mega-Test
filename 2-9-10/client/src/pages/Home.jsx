import './../assets/css/pages/home.css'
import IdentityNavbar from '../components/IdentityNavbar';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Massage from '../components/Massage';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

    useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    }, []);

  if (!user) return <p>No user data</p>;

  return (
    <div className='main-home'>
      <Navbar>
          <IdentityNavbar />
      </Navbar>
      <div className='main-home-container'>
        <Massage massage={`Hello ${user.username}`}/>
        <Massage massage={`Your passing score 's 75%`}/>
        <Massage massage={`Are You Ready`}/>
        <button className='custom-btn text' onClick={() => navigate("/exam")}>Ready Start</button>
      </div>
    </div>

  )
}