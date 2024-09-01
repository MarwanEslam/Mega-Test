import {useEffect, useReducer, useState} from 'react'
import './../assets/css/pages/exam.css';
import Navbar from '../components/Navbar';
import IdentityNavbar from '../components/IdentityNavbar';
import Answer from '../components/Answer';
import ActiveIndexContext from './../context/active-index-context';
import { useNavigate } from "react-router-dom";

const initialStateTimer = {
  hours: 0,
  minutes: 1,
  seconds: 2,
  availableTime: 0,
};

const reducerTimer = (state, action) => {
  switch (action.type) {
    case 'TICK':
      let { hours, minutes, seconds } = state;
      
      // Calculate new time
      if (seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else if (hours > 0) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      } else {
        // If time runs out, stop at zero
        return { ...state, availableTime: 0 };
      }

      const newAvailableTime = hours * 3600 + minutes * 60 + seconds;

      // Update state with new time
      return {
        hours,
        minutes,
        seconds,
        availableTime: newAvailableTime,
      };
    case 'RESET':
      return {
        ...initialStateTimer,
        availableTime: initialStateTimer.hours * 3600 + initialStateTimer.minutes * 60 + initialStateTimer.seconds,
      };
    default:
      return state;
  }
};

const initialStateSubmit = {
  submit: false,
  answers: [
    'Answer 1',
    'Answer 2',
    'Answer 3',
    'Answer 4',
    ],
  question: "Question",
  activeIndex: null,
  selectedAnswer: '',
  page: 1,
};

const reducerSubmit = (state, action) => {
  switch (action.type) {
    // when i click on submit
    case 'SUBMIT':
      // this return after send selectedAnswer and fetch both of answers and question
      return {
        ...state,
        submit: false,
        activeIndex: null,
        selectedAnswer: '',
        page: state.page + 1,

    }
    // change active div and set selectedAnswer
    case 'CHANGE_ACTIVE':
      const activeIndex = action.payload;
      const selectedAnswer = state.answers[activeIndex];
      return {
        ...state,
        activeIndex: activeIndex,
        selectedAnswer: selectedAnswer,
    }
    case 'FETCH_DATA':
      return {
        ...initialStateSubmit,
        answers: action.payload.answers,
        question: action.payload.question,
    }

    default:
      return state;
  }
}

export default function Exam() {
  const navigate = useNavigate();
  const [stateTimer, dispatchTimer] = useReducer(reducerTimer, {
    ...initialStateTimer,
    availableTime: initialStateTimer.hours * 3600 + initialStateTimer.minutes * 60 + initialStateTimer.seconds,
  });
  const [stateSubmit, dispatchSubmit] = useReducer(reducerSubmit, initialStateSubmit);

  useEffect(() => {
    if (stateTimer.availableTime > 0) {
      const timerId = setInterval(() => {
        dispatchTimer({ type: 'TICK' });
      }, 1000);

      // Clear the interval when the component is unmounted or when time reaches 0
      return () => clearInterval(timerId);
    }
  }, [stateTimer.availableTime]);
  useEffect(() => {
    if (stateTimer.availableTime === 0) {
      navigate("/score");
      console.log("time is finished")
    }
  }, [stateTimer.availableTime, navigate]);

  // this is for first page in exam 
  useEffect(() => {
    // after get data from server
    dispatchSubmit({
      type: "FETCH_DATA", payload: {
        answers: ["1", "2", "3", "4"],
        question: "First",
    }})
  }, [])

  return (
      <div className='main-exam'>
        <Navbar title="Exam">
            <IdentityNavbar height="50px"/>
        </Navbar>
          <div className="container main-exam-container">
            <div className='info-exam'>
            <div className="timer">
              <div className='hours'>{stateTimer.hours}</div>:
              <div className='mints'>{stateTimer.minutes}</div>:
            <div className='seconds'>{stateTimer.seconds}</div>
            </div>
            <div className="passed-question">
            <div>{stateSubmit.page}</div>/
            <div>10</div>
            </div>                  
            </div>
            <div className="q-a">
                <div className="question">
                    <h4>{stateSubmit.question}</h4>
                </div>
                <div className="choices-con">
                  <ActiveIndexContext.Provider value={{ stateSubmit, dispatchSubmit }}>
                    {stateSubmit.answers.map((answer, index) => (
                      <Answer key={index} text={answer} index={index}/>
                    ))}
                  </ActiveIndexContext.Provider>
                </div>
        </div>
            <div className="btns">
          <button className='custom-btn' onClick={() => dispatchSubmit({type: "SUBMIT"})}>Submit</button>
            </div>  
      </div>
    </div>
  )
}