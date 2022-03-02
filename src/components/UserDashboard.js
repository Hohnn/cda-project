import React from 'react'
import './ServicesSection.css'

function UserDashboard() {
    const auth = localStorage.getItem('user')
    const authParsed = JSON.parse(auth);
    return(
        <>
        <h1 className='titleServices'>DASHBOARD</h1>
        <h1>Bienvenue {authParsed.user.firstname} {authParsed.user.lastname}</h1>
        <div className='dashbb'>
            <button className='hola'>Mes réservations</button>
            <button className='hola'>Informations personnelles</button>
            <button className='hola'>Historique réservations</button>
        </div>
        </>
    )
}

export default UserDashboard