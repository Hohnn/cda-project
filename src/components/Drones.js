import React, {useState, useEffect} from 'react'
import DroneCard from './DroneCard'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { baseUrl } from '../utils/fetchApi'

const Drones = () => {
    const [drones, setDrones] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/drones`);
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