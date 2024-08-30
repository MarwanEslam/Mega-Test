import React from 'react'
import './../assets/css/pages/exam.css';
import Navbar from '../components/Navbar';
import Identity from '../components/Identity';
export default function Exam() {
  return (
      <>
        <Navbar title="Exam">
          <Identity height="50px"/>
        </Navbar>
        <div className="container main-exam-container">
            <div className="question">
                <h4>{"What 's your name ?"}</h4>
            </div>
            <div className="choices-con">
                <div className='answer'>1</div>
                <div className='answer'>2</div>
                <div className='answer'>3</div>
                <div className='answer'>4</div>
            </div>
        </div>

      </>
)
}
