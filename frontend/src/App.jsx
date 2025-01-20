// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import OTPverification from './pages/OTPverification';
import PhoneNO from './pages/PhoneNo';
import Documents from './components/Documents';


import RiderMainLayout from './layout/RiderMainLayout';
import Ride from './pages/Rider';
import ProtectedRoute from './components/ProtectedRoute'; 


import DriverMainLayOut from './layout/DriverMainLayOut';
import Driver from './pages/Driver';
import { useDispatch } from 'react-redux';

import { user_Data_Api } from './api/savaree_api/user_api';



function App() {
  const dispatch = useDispatch()
  const isAuthenticated = document.cookie.includes("authenticated"); 

   useEffect(()=>{
       if(isAuthenticated){
         dispatch(user_Data_Api())
       }
  },[])

  return (
    <Router>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/OTPverification" element={<OTPverification />} />
          <Route path="/about" element={<About />} />
          <Route path="/PhoneNO" element={<PhoneNO />} />
        </Route>

        <Route path="/rider" element={<ProtectedRoute />}>
          <Route element={<RiderMainLayout />}>
            <Route path="" element={<Ride />} />
          </Route>
        </Route>

        <Route path="/driver" element={<ProtectedRoute />}>
          <Route element={<DriverMainLayOut />}>
            <Route path="" element={<Driver />} />
            <Route path="document" element={<Documents />} />
          </Route>
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;