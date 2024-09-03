import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import IdentityNavbar from '../components/IdentityNavbar';
import Massage from './../components/Massage';
import './../assets/css/pages/score.css';

export default function Score() {
  const location = useLocation();
  const { score, massage } = location.state || {};
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
  const passed = score >= 75;

  return (
    <>
      <Navbar title="Score">
        <IdentityNavbar />
      </Navbar>
      <div className="main-score-container">
        <Massage massage="Your Score Is">
          <div className="score-box">{score.toFixed(2)}</div>
        </Massage>
        {massage && (
          <Massage
            massage={`${massage} ${
              passed
                ? "But You Passed The Exam"
                : "And Unfortunately You Don't Pass The Exam"
            }`}
          />
        )}
        {(passed && !massage) && (
          <Massage massage="Congratulations You Passed The Exam" />
        )}
        {(!passed && !massage) &&  (
          <Massage massage="Unfortunately You Don't Pass The Exam" />
        )}
      </div>
    </>
  );
}