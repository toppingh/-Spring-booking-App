import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();

                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>어서오세요, {user.name}님</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>프로필 수정</button>
                <button className="logout-button" onClick={handleLogout}>로그아웃</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>내 프로필 정보</h3>
                    <p><strong>이메일 : </strong>{user.email}</p>
                    <p><strong>전화번호 : </strong>{user.phoneNumber}</p>
                </div>
            )}
            <div className="bookings-section">
                <h3>내 과거 예약 내역</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p><strong>예약번호 : </strong>{booking.bookingConfirmationCode}</p>
                                <p><strong>체크인 날짜 : </strong>{booking.checkInDate}</p>
                                <p><strong>체크아웃 날짜 : </strong>{booking.checkOutDate}</p>
                                <p><strong>총 인원 : </strong>{booking.totalNumOfGuest}</p>
                                <p><strong>객실 유형 : </strong>{booking.room.roomType}</p>
                                <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                            </div>
                        ))
                    ) : (
                        <p>과거 예약 내역이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;