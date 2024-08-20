import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ManageBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            }  catch (error) {
                console.error(`예약 불러오기 중 에러 발생 : ${error.message}`);
            }
        };
        fetchBookings();
    }, []);

    const filterBookings = useCallback((term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) => 
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase()));
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    }, [bookings]);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings, filterBookings]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bookings-container">
            <h2>전체 예약내역</h2>
            <div className="search-div">
                <label>예약 내역 검색 : </label>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="예약 번호 입력"
                />
            </div>

            <div className="booking-results">
                {currentBookings.map((booking) => (
                    <div className="booking-result-item" key={booking.id}>
                        <p><strong>예약 번호 : </strong>{booking.bookingConfirmationCode}</p>
                        <p><strong>체크인 날짜 : </strong>{booking.checkInDate}</p>
                        <p><strong>체크아웃 날짜 : </strong>{booking.checkOutDate}</p>
                        <p><strong>총 인원 : </strong>{booking.totalNumOfGuest}</p>
                        <button className="edit-room-button" onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}>예약 관리</button>
                    </div>
                ))}
            </div>
            <Pagination 
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingPage;