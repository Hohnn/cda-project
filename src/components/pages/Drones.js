import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../../App.css'
import Drones from '../Drones'
import Drone from '../Drone'

const DronesPage = () => {
  return (
    <Routes>
        <Route path='/' element={<Drones />}></Route>
        <Route path=':id' element={<Drone />}></Route>
    </Routes>
  );
}

export default DronesPage