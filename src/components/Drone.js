import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DroneCard from './DroneCard'
import Footer from "./Footer"
import { baseUrl } from '../utils/fetchApi'

const Drone = () => {
    const { id } = useParams()
    const [drone, setDrone] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/drones/${id}`);
            const json = await data.json()
            setDrone(json)
        }
        fetchData()
    }, [id])

    return drone ? (
        <div>
            <DroneCard drone={drone} />
            <Footer />
        </div>
    ) : null
}

export default Drone