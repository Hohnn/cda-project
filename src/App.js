import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import DronesPage from './components/pages/Drones';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import UserDashboard from './components/UserDashboard';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/products/*' exact element={<DronesPage />}></Route>
          <Route path='/services' exact element={<Services />}></Route>
          <Route path='/sign-up' exact element={<SignUp />}></Route>
          <Route path='/sign-in' exact element={<SignIn />}></Route>
          <Route path='/dashboard' exact element={<UserDashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;