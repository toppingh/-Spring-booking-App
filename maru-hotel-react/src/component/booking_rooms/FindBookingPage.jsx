import React, { useState } from "react";

import ApiService from "../../service/ApiService";

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("예약 확인 번호를 입력해주세요.");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
            setBookingDetails(response.booking);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>예약 확인</h2>
            <div className="search-container">
                <input required 
                type="text" 
                placeholder="예약 번호 입력" 
                value={confirmationCode} 
                onChange={(e) => setConfirmationCode(e.target.value)} 
                />
                <button onClick={handleSearch}>조회</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>예약 정보</h3>
                    <p>예약 번호 : {bookingDetails.bookingConfirmationCode}</p>
                    <p>체크인 날짜 : {bookingDetails.checkInDate}</p>
                    <p>체크아웃 날짜 : {bookingDetails.checkOutDate}</p>
                    <p>성인 : {bookingDetails.numOfAdults}명</p>
                    <p>유아 : {bookingDetails.numOfChildren}명</p>

                    <br />
                    <hr />
                    <br />
                    <h3>예약자 정보</h3>
                    <div>
                        <p>이름 : {bookingDetails.user.name}</p>
                        <p>이메일 : {bookingDetails.user.email}</p>
                        <p>전화번호 : {bookingDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>객실 정보</h3>
                    <div>
                        <p>객실 유형 : {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindBookingPage;