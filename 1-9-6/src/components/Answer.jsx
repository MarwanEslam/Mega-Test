import './../assets/css/components/answer.css'
import  ActiveIndexContext from '../context/active-index-context';
import { useContext } from 'react';

export default function Answer({ text, index }) {
  const { stateSubmit, dispatchSubmit } = useContext(ActiveIndexContext);
  const handelClick = () => {
    dispatchSubmit({type: "CHANGE_ACTIVE", payload: index})
  }
  
  return (
      <div className={`answer ${stateSubmit.activeIndex === index ? 'selected-answer' : ''}`} onClick={handelClick}>{text}</div>
  )
}
