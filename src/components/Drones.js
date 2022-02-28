import React, {useState, useEffect} from 'react'
import DroneCard from './DroneCard'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Drones = () => {
    const [drones, setDrones] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await window.fetch('https://skydrone-api.herokuapp.com/api/v1/drones')
            const json = await data.json()
            setDrones(json)
        }
        fetchData()

    }, [])

    return (
        <>
        <h1 className='titleDrone'>notre sélection de drones</h1>
        {drones.map(drone => (
            <Link key={drone._id} to={drone._id}>
                <DroneCard drone={drone}></DroneCard>
            </Link>
        ))}
        <Footer />
        </>
    )
}

export default Drones