import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ApiService from "../../service/ApiService";

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchBookingDetails();
    }, [bookingCode]);

    const acheiveBooking = async (bookingId) => {
        if (!window.confirm("정말 예약을 확정하시겠습니까?")) {
            return;
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("예약이 성공적으로 확정되었습니다.");
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-booking-page">
            <h2>예약 상세정보</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {bookingDetails && (
                <div className="booking-details">
                    <h3>예약 내역</h3>
                    <p>예약번호 : {bookingDetails.bookingConfirmationCode}</p>
                    <p>체크인 날짜 : {bookingDetails.checkInDate}</p>
                    <p>체크아웃 날짜 : {bookingDetails.checkOutDate}</p>
                    <p>성인 : {bookingDetails.numOfAdults}명</p>
                    <p>유아 : {bookingDetails.numOfChildren}명</p>
                    <p>예약자 이메일 : {bookingDetails.guestEmail}</p>

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
                        <p>객실 금액 : ${bookingDetails.room.roomPrice}</p>
                        <p>객실 설명 : {bookingDetails.room.roomDescription}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                    <button className="acheive-booking"
                        onClick={() => acheiveBooking(bookingDetails.id)}>
                            예약 확정
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBookingPage;