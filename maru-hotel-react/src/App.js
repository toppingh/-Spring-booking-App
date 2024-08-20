import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import FindBookingPage from './component/booking_rooms/FindBookingPage';
import { ProtectedRoute } from './service/guard';
import RoomDetailsPage from './component/booking_rooms/RoomDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
          <div className='content'>
            <Routes>
            {/* Public Routes */}
            <Route exact path='/home' element={<HomePage />}/>
            <Route exact path='/login' element={<LoginPage />}/>
            <Route exact path='/register' element={<RegisterPage />}/>
            <Route exact path='/rooms' element={<AllRoomsPage />}/>
            <Route exact path='/find-booking' element={<FindBookingPage />}/>
            
            {/* Protected Routes */}
            <Route exact path='/room-details-book/:roomId' 
            element={<ProtectedRoute element={RoomDetailsPage} />}/>
            <Route exact path='/profile' 
            element={<ProtectedRoute element={ProfilePage} />} />
            <Route exact path='/edit-profile'
            element={<ProtectedRoute element={EditProfilePage} />} />

            
            
            </Routes>
          </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
