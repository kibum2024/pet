import React from 'react';
import './MypageBanner.css';
import Header from '../../components/Header/Header';

function MypageBanner() {
    return (
        <div className="Mypage_container">
            <Header colorTheme="white" />
            <p>MY PAGE</p>
        </div>
    );
}

export default MypageBanner