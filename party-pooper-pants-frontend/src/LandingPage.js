import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div id="LandingPage__container">
            <div id="home">
                <h1 id="LandingPage__title">Spongebob Trivia</h1>
                <Link to='/game'>
                    <button className="btn">Play</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage
