import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import ApiService from "../../service/ApiService";

const RoomDetailsPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalGuests, setTotalGuests] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails(response.room);

                const userProfile = await ApiService.getUserProfile();
                setUserId(userProfile.user.id);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [roomId]);

    const handleConfirmBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setErrorMessage("체크인 날짜 또는 체크아웃 날짜를 선택해주세요.");
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
            setErrorMessage("성인 또는 유아의 인원을 선택해주세요.");
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        // Calculate total number of days
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * millseconds
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

        // Calculate total number of guests
        const totalGuests = numAdults + numChildren;

        // Calcurate total price
        const roomPricePerNight = roomDetails.roomPrice;
        const totalPrice = roomPricePerNight * totalDays;

        setTotalPrice(totalPrice);
        setTotalGuests(totalGuests);
    };

    const acceptBooking = async () => {
        try {
            // Ensure checkInDate and checkOutDate are Date objects
            const startDate = new Date(checkInDate);
            const endDate = new Date(checkOutDate);

            console.log(`체크인 날짜 : ${checkInDate}`);
            console.log(`체크아웃 날짜 : ${endDate}`);

            // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
            const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
        
            console.log(`포맷팅한 체크인 날짜 : ${formattedCheckInDate}`);
            console.log(`포맷팅한 체크아웃 날짜 : ${formattedCheckOutDate}`);

            // Create booking object
            const booking = {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckOutDate,
                numOfAdults: numAdults,
                numOfChildren: numChildren
            };

            console.log(booking);
            console.log(checkOutDate);

            // Make booking
            const response = await ApiService.bookRoom(roomId, userId, booking);
            console.log(`예약자 : ${userId}, 방 : ${roomId}`);

            if (response.statusCode === 200) {
                setConfirmationCode(response.bookingConfirmationCode);
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                    navigate("/rooms");
                }, 10000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    if (isLoading) {
        return <p className="room-detail-loading">객실 정보 로딩중...</p>;
    }

    if (error) {
        return <p className="room-detail-loading">{error}</p>
    }

    if (!roomDetails) {
        return <p className="room-detail-loading">객실이 없습니다.</p>
    }

    const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

    return (
        <div className="room-details-booking">
            {showMessage && (
                <p className="booking-success-message">
                    예약 성공! 예약번호 : {confirmationCode}. SMS와 이메일로 예약 정보를 보냈습니다.
                </p>
            )}
            {errorMessage && (
                <p className="error-message">
                    {errorMessage}
                </p>
            )}
            <h2>객실 정보</h2>
            <br />
            <img src={roomPhotoUrl} alt={roomType} className="room-details-image" />
            <div className="room-details-info">
                <h3>{roomType}</h3>
                <p>금액 : ${roomPrice} / 1박 당</p>
                <p>{description}</p>
            </div>
            {bookings && bookings.length > 0 && (
                <div>
                    <h3>예약 세부 정보</h3>
                    <ul className="booking-list">
                        {bookings.map((booking, index) => (
                            <li key={booking.id} className="booking-item">
                                <span className="booking-number">예약 {index + 1}</span>
                                <span className="booking-text">체크인 : {booking.checkInDate}</span>
                                <span className="booking-text">체크아웃 : {booking.checkOutDate}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="booking-info">
                <button className="book-now-button" onClick={() => setShowDatePicker(true)}>예약하기</button>
                <button className="go-back-button" onClick={() => setShowDatePicker(false)}>뒤로가기</button>
                {showDatePicker && (
                    <div className="date-picker-container">
                        <DatePicker 
                            className="detail-search-field"
                            selected={checkInDate}
                            onChange={(date) => setCheckInDate(date)}
                            selectsStart
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            placeholderText="체크인 날짜"
                            dateFormat={"yyyy-MM-dd"}
                        />
                        <DatePicker 
                            className="detail-search-field"
                            selected={checkOutDate}
                            onChange={(date) => setCheckOutDate(date)}
                            selectsEnd
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            minDate={checkInDate}
                            placeholderText="체크아웃 날짜"
                            dateFormat={"yyyy-MM-dd"}
                        />
                        <div className="guest-conatiner">
                            <div className="guest-div">
                                <label>성인</label>
                                <input type="number" min="1" value={numAdults}
                                    onChange={(e) => setNumAdults(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="guest-div">
                                <label>유아</label>
                                <input type="number" min="0" value={numChildren} 
                                    onChange={(e) => setNumChildren(parseInt(e.target.value))}
                                />
                            </div>
                            <button className="confirm-booking" onClick={handleConfirmBooking}>예약 확인</button>
                        </div>
                    </div>
                )}
                {totalPrice > 0 && (
                    <div className="total-price">
                        <p>전체 금액 : ${totalPrice}</p>
                        <p>전체 인원 : {totalGuests}</p>
                        <button onClick={acceptBooking} className="accept-booking">예약 확정</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomDetailsPage;