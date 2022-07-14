import { useState } from 'react';
import './MainGame.styles.scss';

import { getRandom4Digits } from '../../utils/randoms'
import { STATUS } from '../../constants/constants';

function MainGame() {
  const [inputGuess, setInputGuess] = useState("0000")
  const [inputText, setInputText] = useState("")

  const [guess, setGuess] = useState(getRandom4Digits())
  const [statusAnswer, setStatusAnswer] = useState(STATUS.none)

  const confettiElements = Array(10).fill(0);

  const setInput = (event) => {
    if(!event.target) return
    setInputGuess(event.target.value)
    setInputText(event.target.value)
    setStatusAnswer(STATUS.none)
    if (event.target.value == '') {
      clean()
    } 
  }

  const check = () => {
    console.log("correct unswer-", guess)
    if (guess === inputGuess) setStatusAnswer(STATUS.correct)
    else setStatusAnswer(STATUS.wrong)
  }

  const getNewRandom = () => {
    clean()
    setGuess(getRandom4Digits())
  }

  const clean = () => {
    setStatusAnswer(STATUS.none)
    setInputGuess("0000")
    setInputText("")
  }

  return (
    <div className="App ">
        {statusAnswer === STATUS.correct ?<div className='confetti-container'>
     {confettiElements.map(() => (<div className='confetti'></div>))} </div>: <div></div>}
      
      {
        statusAnswer === STATUS.none ?
        <div className='guess-label'>make a guess</div>
        :
        ( statusAnswer === STATUS.wrong ?
            <div className='wrong'>wrong answer!</div>
          :
          <div className='correct'>correct</div>
        )
      }
      <div className="digits" >
        {/* {statusAnswer === STATUS.wrong ?? <div> 1</div>} */}
        <div className={ inputText === ""? "inputDigits hint": "inputDigits nothint"}>
           { inputGuess.split("").map((char , index)=> (
             <div className={
               statusAnswer === STATUS.none ? "single_char" :
                ( guess.charAt(index) === char ? "single_char correct" : "single_char wrong" )
              } key={index}>{char}</div>
            ))}
        </div>
       
        <input type="text"  maxLength="4" value={inputText} onChange={setInput} autoFocus/>
      </div>
      <button className='check-button' onClick={check} disabled={inputText.length != 4}>wish me luck</button>
      <button className='check-button' onClick={getNewRandom}>another</button>

    </div>
  )
}

export default MainGame
