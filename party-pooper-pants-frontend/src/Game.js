import React, { useState, useEffect, useRef } from 'react'
import './Game.css'
import { Link } from 'react-router-dom'
import axios from './axios'

function Game() {
    const [curQuestion, setCurQuestion] = useState(1)
    const [score, setScore] = useState(0)
    const [acceptingAnswers, setAcceptingAnswers] = useState(true)
    const [questions, setQuestions] = useState([])
    const [questionsLoaded, setQuestionsLoaded] = useState(false)
    const progressBarFull = useRef()

    useEffect(() => {
        async function fetchData() {
            await axios.get('/partypooperpants/question')
            .then(function (response) {
                console.log(response);
                setQuestions(response.data)
                setQuestionsLoaded(true)
              })
              .catch(function (error) {
                console.log(error);
              })
        }

        fetchData()
    }, [])

    useEffect(() => {
        progressBarFull.current.style.width = `${(curQuestion / MAX_QUESTIONS) * 100}%`
    }, [curQuestion])

    const MAX_QUESTIONS = 15

    const answerSelect = (e) => {
        if (!acceptingAnswers) return
        setAcceptingAnswers(false)
        const classToApply = e.target.parentElement.children[1].innerText === 
            questions[curQuestion - 1].correctAnswer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            setScore(score + 1)
        } 
        e.target.parentElement.classList.add(classToApply)
        setTimeout(() => {
            if (curQuestion >= MAX_QUESTIONS || curQuestion >= questions.length) {
                document.querySelector("#game").style.display = 'none'
                document.querySelector("#endOfGame").style.display = 'flex';
            } else {
            setAcceptingAnswers(true)
            setCurQuestion(curQuestion + 1)
            e.target.parentElement.classList.remove(classToApply)
            }
        }, 1000)
     }

    return (
        <div className="container">
            <div id="game">
                <div id="hud">
                    <div className="hud-item">
                        <div id="progressBar">
                            <div id="progressBarFull" ref={progressBarFull}></div>
                        </div>
                        <p id="progressText" className="hud-prefix">
                            Question { curQuestion } out of { MAX_QUESTIONS }
                        </p>
                    </div>
                    <div className="hud-item">
                        <p className="hud-prefix">
                            Score
                        </p>
                        <h1 className="hud-main-text" id="score">
                            {score} 
                        </h1>
                    </div>
                </div>
                {questionsLoaded && <main>
                    <h1 id="question">{ questions[curQuestion - 1].question }</h1>
                    <div id="buttons">
                        <button onClick={answerSelect} className="choice-container">
                            <p className="choice-prefix">A</p>
                            <p className="choice-text">{ questions[curQuestion - 1].A }</p>
                        </button>
                        <button onClick={answerSelect}  className="choice-container">
                            <p className="choice-prefix">B</p>
                            <p className="choice-text">{ questions[curQuestion - 1].B }</p>
                        </button>
                        <button onClick={answerSelect}  className="choice-container">
                            <p className="choice-prefix">C</p>
                            <p className="choice-text">{ questions[curQuestion - 1].C }</p>
                        </button>
                        <button onClick={answerSelect}  className="choice-container">
                            <p className="choice-prefix">D</p>
                            <p className="choice-text">{ questions[curQuestion - 1].D }</p>
                        </button>
                    </div>
                </main>}
            </div> 
            <div id='endOfGame'>
                <h1 id="end__title">Your score is {score} out of {MAX_QUESTIONS}</h1>
                <Link to='/'>
                    <button className="btn">Go Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Game
