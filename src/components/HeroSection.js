import React from "react"
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'

function HeroSection() {
    return (
        <div className="hero-container">
            <h1>SKY DRONE</h1>
            <p>Votre prestataire aérien pour tous vos projets.</p>
            <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>découvrir</Button>
            </div>
        </div>
    )
}

export default HeroSection