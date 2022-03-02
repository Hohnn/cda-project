import React, { useState } from "react"
import '../App.css'
import './SignUpSection.css'
import Footer from "./Footer"
import { baseUrl } from "../utils/fetchApi"
import { useNavigate } from "react-router-dom"

const SignUpSection = () => {
    const [lastName_u, setLastName] = useState('')
    const [firstName_u, setFirstName] = useState('')
    const [company_u, setCompany] = useState('')
    const [phone_u, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const collectData = async () => {
        console.warn(lastName_u, firstName_u, company_u, phone_u, email, password)
        let result = await fetch(`${baseUrl}/users`, {
            method:'post',
            body: JSON.stringify({lastName_u, firstName_u, company_u, phone_u, email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
        localStorage.setItem('user', JSON.stringify(result))
        alert('Votre compte a été crée avec succès !')
        navigate('/sign-in')
    
    }

    return (
        <>
        <div className="signup-container">
            <div className="test">
            <h1 className="titleSignUp">formulaire d'inscription</h1>
                <div className="inputLogin">
                    <input className="inputBox" name="lastName_u" type='text' value={lastName_u} onChange={(e)=>setLastName(e.target.value)} placeholder="NOM" />
                    <input className="inputBox" name="firstName_u" type='text' value={firstName_u} onChange={(e)=>setFirstName(e.target.value)} placeholder="PRÉNOM" />
                </div>
                <div className="inputLogin">
                    <input className="inputBox" name="company_u" type='text' value={company_u} onChange={(e)=>setCompany(e.target.value)} placeholder="NOM ENTREPRISE" />
                    <input className="inputBox" type='hidden' placeholder="SIRET" />
                </div>
                <div className="inputLogin">
                    <input className="inputBox" type='hidden' name="" placeholder="ADRESSE ENTREPRISE" />
                </div>
                <div className="inputLogin">
                    <input className="inputBox" name="phone_u" type='text' value={phone_u} onChange={(e)=>setPhone(e.target.value)} placeholder="TÉLÉPHONE" />
                    <input className="inputBox" name="email" type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="EMAIL" />
                </div>
                <div className="inputLogin">
                    <input className="inputBox" name="password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="MOT DE PASSE" />
                    <input className="inputBox" name="confirmPassword" type='password' placeholder="CONFIRMEZ MOT DE PASSE" />
                </div>
                <div className="submitSection">
                    <button type="button" onClick={collectData} className="submitBox">Inscription</button>
                </div>
                </div>
        </div>
        <Footer />
        </>
    )
}

export default SignUpSection