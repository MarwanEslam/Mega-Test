import Navbar from '../components/Navbar'
import IdentityNavbar from '../components/IdentityNavbar'
import Massage from '../components/massage'
import './../assets/css/pages/score.css'

export default function score() {
    return (
    <>
        <Navbar>
            <IdentityNavbar />
        </Navbar>
        <div className="main-score-container">
            <Massage massage="Your Score Is">
                <div className="score-box">75</div>  
            </Massage>
            <Massage massage="Congratulation You Pass The Exam" />
            <button className='custom-btn'>Review your answer</button>
        </div>
    </>
  )
}
