import { useState } from 'react';
import './MainGame.styles.scss';

import { getRandom4Digits } from '../../utils/randoms'
import { STATUS } from '../../constants/constants';
import Confetti from '../confetti/Confetti.componnent';

function MainGame() {
  const [inputGuess, setInputGuess] = useState("0000")
  const [inputText, setInputText] = useState("")

  const [guess, setGuess] = useState(getRandom4Digits())
  const [statusAnswer, setStatusAnswer] = useState(STATUS.none)

  const setInput = (event) => {
    if(!event.target) return
    setInputGuess(event.target.value)
    setInputText(event.target.value)
    setStatusAnswer(STATUS.none)
    if (event.target.value == '') {
      clean()
    } 
     if (event.target.value .length == 4) {
      // check()
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
        {statusAnswer === STATUS.correct ? <Confetti /> : <div></div>}
      
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
