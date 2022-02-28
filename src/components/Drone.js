import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DroneCard from './DroneCard'
import Footer from "./Footer"

const Drone = () => {
    const { id } = useParams()
    const [drone, setDrone] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            console.log('INSIDE FETCH');
            const data = await window.fetch(`https://skydrone-api.herokuapp.com/api/v1/drones/${id}`)
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