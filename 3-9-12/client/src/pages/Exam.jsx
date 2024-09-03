import {useEffect, useReducer, useState, useContext} from 'react'
import './../assets/css/pages/exam.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import IdentityNavbar from '../components/IdentityNavbar';
import Answer from '../components/Answer';
import { useNavigate } from "react-router-dom";
import { SetAvailablePagesContext } from "../context/set-available-pages";

const initialStateTimer = {
  hours: 0,
  minutes: 1,
  seconds: 0,
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
  question: "Question",
  answers: [
    'Answer 1',
    'Answer 2',
    'Answer 3',
    'Answer 4',
  ],
  activeIndex: null,
  selectedAnswer: '',
  page: 0,
};

const reducerSubmit = (state, action) => {
  switch (action.type) {
    // when i click on submit
    case 'SUBMIT':
      // in this point you must send selectedAnswer and fetch both of answers -> ["first", "second", ... ] and question -> "question"
      return {
        ...state,
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

const initialStateSkip = {
  skippedPages: 0,
};

const reducerSkip = (state, action) => {
  switch (action.type) {
    // when i click on skip
    case 'SKIP':
      // in this point you must send the skipped questions to server
      // All questions answered, submit to backend
      // axios.post('http://localhost:5000/api/addSpikedQuestions', {question: questions[currentQuestionIndex]})
      // .then(response => {
      //     const score = response.data.score;
      //     navigate('/score', { state: { score } }); // Ensure 'score' is passed here
      //   }).catch(error => {
      //     console.error('Error submitting answers:', error);
      //   });
        
      //   setSelectedAnswer(null);
      //   setCurrentQuestionIndex(currentQuestionIndex + 1);
      const skippedPage = state.skippedPages + 1;
      return {
        skippedPages: skippedPage,
      }

    default:
      return state;
  }
}

export default function Exam() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();
  const [stateTimer, dispatchTimer] = useReducer(reducerTimer, {
    ...initialStateTimer,
    availableTime: initialStateTimer.hours * 3600 + initialStateTimer.minutes * 60 + initialStateTimer.seconds,
  });
  const [page, setPage] = useState(1);
  const [stateSubmit, dispatchSubmit] = useReducer(reducerSubmit, initialStateSubmit);
  const [stateSkip, dispatchSkip] = useReducer(reducerSkip, initialStateSkip);
  const { setAvailableScore, availableScore, availableUserChoice, setAvailableUserChoice } = useContext(SetAvailablePagesContext);

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
      setAvailableScore(true);
      axios.post('http://localhost:5000/api/users/quiz/submit', { answers: answers })
        .then(response => {
          const score = response.data.score;
          const massage = "Your Time Is Finished"
          navigate('/score', { state: { score, massage} }); // Ensure 'score' is passed here
        }).catch(error => {
          console.error('Error submitting answers:', error);
        });
      
      console.log("time is finished")
    }
  }, [stateTimer.availableTime]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/quiz');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (stateSubmit.page > 0 || stateSkip.skippedPages > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [stateSubmit.page, stateSkip.skippedPages])
  useEffect(() => {
    if (page > 10) {
      if (stateSkip.skippedPages > 0) {
        setAvailableUserChoice(true)
      } else {
        setAvailableScore(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (availableScore) {
      navigate("/score");
    }
  }, [availableScore])
  useEffect(() => {
    if (availableUserChoice) {
      navigate("/userChoice", {state: {answers}});
    }
  }, [availableUserChoice])

const handleAnswerSubmit = () => {
  // Update answers using a functional update to ensure the latest state
  setAnswers((prevAnswers) => {
    const updatedAnswers = [...prevAnswers, selectedAnswer];

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      console.log(updatedAnswers); // Log the updated answers
      // All questions answered, submit to backend
      console.log('Submitting answers:', updatedAnswers);
      axios.post('http://localhost:5000/api/users/quiz/submit', { answers: updatedAnswers })
        .then(response => {
          const score = response.data.score;
          navigate('/score', { state: { score } }); // Ensure 'score' is passed here
        }).catch(error => {
          console.error('Error submitting answers:', error);
        });
    }

    return updatedAnswers; // Return the updated state
  });
};

  return (
 <div className="main-exam">
      <Navbar title="Exam">
        <IdentityNavbar/>
      </Navbar>
      <div className="container main-exam-container">
        {questions.length > 0 && (
          <>
          <div className='info-exam'>
            <div className="timer">
              <div className='hours'>{stateTimer.hours}</div>:
              <div className='mints'>{stateTimer.minutes}</div>:
            <div className='seconds'>{stateTimer.seconds}</div>
            </div>
            <div className="passed-question">
            <div>{page}</div>/
            <div>10</div>
            </div>                  
            </div>
            <div className="q-a">
            <div className="question">
              <h4>{questions[currentQuestionIndex].question}</h4>
            </div>
            <div className="choices-con">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <Answer
                  key={index}
                  text={answer}
                  index={index}
                  onSelect={() => setSelectedAnswer(index)}
                  isSelected={selectedAnswer === index}
                />
              ))}
            </div>
            </div>
            <div className="btns">
              <button className="custom-btn" onClick={() => { dispatchSubmit({ type: "SUBMIT" }); handleAnswerSubmit(); }}>Submit</button>
              <button className='custom-btn' onClick={() => { dispatchSkip({ type: "SKIP" })}}>Skip</button>     
            </div>
          </>
        )}
      </div>
  </div>
  );
}