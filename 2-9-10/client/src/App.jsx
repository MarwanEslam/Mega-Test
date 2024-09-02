import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Score from './pages/Score';
import UserChoice from './pages/UserChoice';
import SkippedQuestions from './pages/SkippedQuestions'
import { ActiveIndexProvider } from './context/active-index-context';


function App() {
  return (
        <ActiveIndexProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" exact></Navigate>} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/score" element={<Score />}></Route>
          <Route path="/exam" element={<Exam />}></Route>
          <Route path="/userChoice" element={<UserChoice />} />
          <Route path='/skippedQuestions' element={<SkippedQuestions />} />
        </Routes>
      </Router>
      </ActiveIndexProvider>
      
 )
}

export default App