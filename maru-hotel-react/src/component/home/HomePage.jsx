import React, { useState } from "react";

import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

const HomePage = () => {
    const [roomSearchResults, setRoomSearchResults] = useState([]);

    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="Home">
            {/* Header -> Banner, Room Section */}
            <section>
                <header className="header-banner">
                    <img src="./assets/images/hotel.jpg" alt="Maru Hotel" className="header-image" />
                    <div className="overlay"></div>
                    <div className="animated-text overlay-content">
                        <h1>
                            도심 속 휴식을 위한 선택 <span className="maru-color">Maru Hotel</span>
                        </h1><br />
                        <h4>지친 당신을 위한 편안하고 세심한 서비스의 안식처로 초대합니다.</h4>
                    </div>
                </header>
            </section>

            {/* Search, Find Available room section */}
            <RoomSearch handleSearchResult={handleSearchResult} />
            <RoomResult roomSearchResults={roomSearchResults} />

            <h4><a className="view-rooms-home" href="/rooms">전체 객실</a></h4>

            <h2 className="home-services"><span className="maru-color">Maru Hotel</span>만의 서비스</h2>

            {/* Services Section */}
            <section className="service-section">
                <div className="service-card">
                    <img src="./assets/images/ac.png" alt="에어컨" />
                    <div className="service-details">
                        <h3 className="service-title">Air Conditioning</h3>
                        <p className="service-description">객실 내 개별 온도 조절 에어컨으로 상쾌하고 쾌적한 숙박을 보장합니다.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/mini-bar.png" alt="미니바" />
                    <div className="service-details">
                        <h3 className="service-title">Mini Bar</h3>
                        <p className="service-description">객실 미니바에서 제공되는 음료와 간식을 추가 요금 없이 편안하게 이용하실 수 있습니다.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/parking.png" alt="주차" />
                    <div className="service-details">
                        <h3 className="service-title">Parking</h3>
                        <p className="service-description">편리한 주차를 위해 호텔 내 주차 서비스를 제공합니다. 발레 파킹 서비스는 호텔로 문의해 주세요.</p>
                    </div>
                </div>
                <div className="service-card">
                    <img src="./assets/images/wifi.png" alt="와이파이" />
                    <div className="service-details">
                        <h3 className="service-title">Wifi</h3>
                        <p className="service-description">모든 객실과 공용 구역에 무료 고속 Wi-Fi를 제공하여 숙박 기간 동안 항상 연결 상태를 유지하실 수 있습니다.</p>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default HomePage;