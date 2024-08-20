import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error(`관리자 정보 불러오기 중 에러 발생 : ${error.message}`);
            }
        };
        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="welcome-message">환영합니다, {adminName}</h1>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>객실 관리</button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-bookings')}>예약 관리</button>
            </div>
        </div>
    );
}

export default AdminPage;