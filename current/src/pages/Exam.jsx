import React from 'react'
import './../assets/css/pages/exam.css';
import Navbar from '../components/Navbar';
import IdentityNavbar from '../components/IdentityNavbar';
export default function Exam() {
  return (
      <div className='main'>
        <Navbar title="Exam">
            <IdentityNavbar height="50px"/>
        </Navbar>

          <div className="container main-exam-container">
            <div className='info-exam'>
            <div className="timer">
              <div className='hours'>40</div>:
              <div className='mints'>00</div>:
              <div className='seconds'>00</div>
            </div>
            <div className="passed-question">
            <div>2</div>/
            <div>10</div>
            </div>                  
            </div>
            <div className="q-a">
                <div className="question">
                    <h4>Question</h4>
                </div>
                <div className="choices-con">
                    <div className='answer'>1</div>
                    <div className='answer'>2</div>
                    <div className='answer'>3</div>
                    <div className='answer'>4</div>
                </div>
            </div>
            <div className="btns">
            <button className='custom-btn'>Submit</button>
            <button className='custom-btn'>Skip</button>
            </div>  
        </div>
      </div>
)
}
