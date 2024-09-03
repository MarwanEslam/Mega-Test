import './../assets/css/pages/home.css'
import IdentityNavbar from '../components/IdentityNavbar';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import Massage from '../components/Massage';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SetAvailablePagesContext } from "../context/set-available-pages";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {setAvailableExam, availableExam} = useContext(SetAvailablePagesContext);

    useEffect(() => {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
   const handleClick = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/update-enter-exam-before', { email: user.email });
      setAvailableExam(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (availableExam) {
      navigate("/exam");
    }
  }, [availableExam]);

  if (!user) return <p>No user data</p>;

  return (
    <div className='main-home'>
      <Navbar>
          <IdentityNavbar />
      </Navbar>
      <div className='main-home-container'>
        <Massage massage={`Hello ${user.username}`} />
        {!user.enterExamBefore && (
          <>
            <Massage massage={`Your Passing Score Is`} >
            <div className="score-box">75%</div>
            </Massage>
          <Massage massage={`Are You Ready`}/>
            <button className='custom-btn text' onClick={() => handleClick()}>Ready Start</button>
          </>
        )
        }
        {user.enterExamBefore && (
          <Massage massage="You Have Entered To Exam"/>
        )}
      </div>
    </div>

  )
}