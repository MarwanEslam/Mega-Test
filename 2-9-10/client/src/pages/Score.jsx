import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import IdentityNavbar from '../components/IdentityNavbar';
import Massage from './../components/Massage';
import './../assets/css/pages/score.css';

export default function Score() {
  const location = useLocation();
  const { score } = location.state || {};
  console.log(score)
  if (score === undefined) {
    return (
      <div>
        <Navbar title="Score">
          <IdentityNavbar />
        </Navbar>
        <div className="main-score-container">
          <Massage massage="No score available" />
        </div>
      </div>
    );
  }
  return (
  <>
    <Navbar title="Score">
        <IdentityNavbar />
      </Navbar>
      <div className="main-score-container">
        <Massage massage="Your Score Is">
          <div className="score-box">{score.toFixed(2)}</div>
        </Massage>
        <Massage massage="Congratulations You Passed The Exam" />
      </div>
  </>
  )
}