import IdentityNavbar from "../components/IdentityNavbar";
import Navbar from "../components/Navbar";
import '../assets/css/pages/userChoice.css';
import AskBox from "../components/AskBox";
// This Page Is Used To Ask User If He Want To Solve Skipped Questions And This Page Is Appeared When User Click On Submit And There Are Skipped Questions
export default function UserChoice() {
  return (
      <>
      <Navbar>
        <IdentityNavbar />
      </Navbar>      
      <div className="container main-user-choice-container">
        <AskBox text="You have an unanswered questions, would you like to show skipped question ?" yesNav="/skippedQuestions" noNav="/score"/>
      </div>
      </>
  )
}
