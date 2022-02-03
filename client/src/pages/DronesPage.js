import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Drones from '../components/Drones'
import Drone from '../components/Drone'

const DronesPage = () => {
  return (
    <Routes>
        <Route path='/' element={<Drones />}></Route>
        <Route path=':id' element={<Drone />}></Route>
    </Routes>
  );
}

export default DronesPage