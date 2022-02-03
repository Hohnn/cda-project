import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import DronesPage from './pages/DronesPage'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='drones/*' element={<DronesPage/>}></Route>
        <Route path='about' element={<h1>A Propos</h1>}></Route>
        <Route path='signup' element={<h1>INSCRIPTION</h1>}></Route>
        <Route path='*' element={<h1>Page non trouvée</h1>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
