import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm("정말 계정 탈퇴를 진행하시나요?")) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>프로필 수정</h2>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <p><strong>이름 : </strong>{user.name}</p>
                    <p><strong>이메일 : </strong>{user.email}</p>
                    <p><strong>전화번호 : </strong>{user.phoneNumber}</p>
                    <button className="delete-profile-button" onClick={handleDeleteProfile}>프로필 삭제</button>
                </div>
            )}
        </div>
    );
};

export default EditProfilePage;