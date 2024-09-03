import { useNavigate, useLocation } from "react-router-dom";
import "./../assets/css/components/askBox.css";
import Massage from "./Massage";
import { useContext, useEffect } from "react";
import { SetAvailablePagesContext } from "../context/set-available-pages";
import axios from "axios";

export default function AskBox({ text, yesNav, noNav }) {
  const location = useLocation();
  const { answers } = location.state || {};
  const navigate = useNavigate();
  const { setAvailableScore, availableScore } = useContext(
    SetAvailablePagesContext
  );
  const handleClickYes = () => {
    console.log("skippedQuestions");
  };

  const handleClickNo = () => {
    setAvailableScore(true);
  };
  useEffect(() => {
    if (availableScore) {
      if (answers) {
        axios
          .post("http://localhost:5000/api/users/quiz/submit", {
            answers: answers,
          })
          .then((response) => {
            const score = response.data.score;
            navigate(noNav, { state: { score } });
          })
          .catch((error) => {
            console.error("Error submitting answers:", error);
          });
      }
    }
  }, [availableScore]);
  return (
    <div className="ask-box">
      <Massage massage={text} />
      <div className="two-choices">
        <button
          className="custom-btn"
          onClick={() => {
            handleClickYes();
          }}
        >
          Yes
        </button>
        <button
          className="custom-btn"
          onClick={() => {
            handleClickNo();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
}
