import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import FindBookingPage from './component/booking_rooms/FindBookingPage';
import { ProtectedRoute, AdminRoute } from './service/guard';
import RoomDetailsPage from './component/booking_rooms/RoomDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import AdminPage from './component/admin/AdminPage';
import ManageRoomPage from './component/admin/ManageRoomPage';
import EditRoomPage from './component/admin/EditRoomPage';
import AddRoomPage from './component/admin/AddRoomPage';
import ManageBookingPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';


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

            {/* Admin Routes */}
            <Route exact path='/admin'
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route exact path='/admin/manage-rooms'
              element={<AdminRoute element={<ManageRoomPage />} />}
            />
            <Route exact path='/admin/edit-room/:roomId'
              element={<AdminRoute element={<EditRoomPage />} />}
            />
            <Route exact path='/admin/add-room'
              element={<AdminRoute element={<AddRoomPage />} />}
            />
            <Route exact path='/admin/manage-bookings'
              element={<AdminRoute element={<ManageBookingPage />} />}
            />
            <Route exact path='/admin/edit-booking/:bookingCode'
              element={<AdminRoute element={<EditBookingPage />} />}
            />
            
            </Routes>
          </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
