import { useNavigate } from 'react-router-dom'
import './../assets/css/components/askBox.css'
import Massage from './massage'
export default function AskBox({ text, yesNav, noNav }) {
    const navigate = useNavigate();
  return (
      <div className='ask-box'>
          <Massage massage={text} />
          <div className="two-choices">
              <button className="custom-btn" onClick={() => {
                  navigate(yesNav)
          }}>Yes</button>
              <button className="custom-btn" onClick={() => {
                  navigate(noNav)
          }}>No</button>
          </div>
    </div>
  )
}
