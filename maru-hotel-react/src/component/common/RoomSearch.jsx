import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import ApiService from "../../service/ApiService";

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getAllRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error(`Error fetching room types: ${error.message}`);
            }
        };
        fetchRoomTypes();
    }, []);

    // To show errors
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    };

    // To fetch available rooms from database base on search data that'll be passed in
    const handleInternalSearch = async () => {
        if (!startDate || !endDate || !roomType) {
            showError(`항목을 모두 선택해 주세요.`);
            return false;
        }
        try {
            // Convert startDate to the desired format
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

            // Call the API to fetch available rooms
            const response = await ApiService.getAvailableRoomsByDatedAndType(formattedStartDate, formattedEndDate, roomType);

            // Check if the response is successful
            if (response.statusCode == 200) {
                if (response.roomList.length === 0) {
                    showError(`현재 선택하신 객실 유형은 해당 날짜에 예약이 불가능합니다.`);
                    return
                }
                handleSearchResult(response.roomList);
                setError('');
            }
        } catch (error) {
            showError(`에러 발생 : ${error.response.data.message}`);
        }
    };

    return (
        <section>
            <div className="search-container">
                <div className="search-field">
                    <label>체크인 날짜</label>
                    <DatePicker
                        className="search-date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="YYYY/MM/dd"
                        placeholderText="체크인 날짜 선택"
                    />
                </div>
                <div className="search-field">
                    <label>체크아웃 날짜</label>
                    <DatePicker
                    className="search-date"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="YYYY/MM/dd"
                        placeholderText="체크아웃 날짜 선택"
                    />
                </div>

                <div className="search-field">
                    <label>객실 유형</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option disabled value="">
                            객실 유형 선택
                        </option>
                        {roomTypes.map((roomType) => (
                            <option key={roomType} value={roomType}>
                                {roomType}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="home-search-button" onClick={handleInternalSearch}>객실 검색</button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </section>
    );
};

export default RoomSearch;