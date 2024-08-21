import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function Navbar() {

    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm("로그아웃 하시겠습니까?");
        if (isLogout) {
            ApiService.logout();
            navigate("/home");
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">Maru Hotel</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" activeclassname="active">홈</NavLink></li>
                <li><NavLink to="/rooms" activeclassname="active">객실</NavLink></li>
                <li><NavLink to="/find-booking" activeclassname="active">예약 정보</NavLink></li>

                { isUser && <li><NavLink to="/profile" activeclassname="active">프로필</NavLink></li>}
                { isAdmin && <li><NavLink to="/admin" activeclassname="active">관리자</NavLink></li>}

                { !isAuthenticated && <li><NavLink to="/login" activeclassname="active">로그인</NavLink></li>}
                { !isAuthenticated && <li><NavLink to="/register" activeclassname="active">회원가입</NavLink></li>}

                { isAuthenticated &&<li onClick={handleLogout}>로그아웃</li>}
            </ul>
        </nav>
    )
}

export default Navbar;