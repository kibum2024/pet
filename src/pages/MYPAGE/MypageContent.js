import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import MypagePetInfo from './MypagePetInfo.js';
import MypageUserInfo from './MypageUserInfo.js';
import MypageUsedInfo from './MypageUsedInfo.js';
import './MypageContent.css';

function MypageContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    // 처음 페이지 로드 시 '/mypage/pet-info'로 리다이렉트
    useEffect(() => {
        if (location.pathname === '/mypage' || location.pathname === '') {
            navigate('/mypage/pet-info'); // 첫번째 탭으로 리다이렉트
        }
    }, [location.pathname, navigate]);

    // location.pathname에 따라 탭 선택 상태를 변경
    useEffect(() => {
        if (location.pathname === '/mypage/pet-info') {
            setValue(0);
        } else if (location.pathname === '/mypage/user-info') {
            setValue(1);
        } else if (location.pathname === '/mypage/used-info') {
            setValue(2);
        }
    }, [location.pathname]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate('/mypage/pet-info');
        if (newValue === 1) navigate('/mypage/user-info');
        if (newValue === 2) navigate('/mypage/used-info');
    };

    return (
        <div className="MypageContent_content-container">
            <Box className="MypageContent_content-box">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    classes={{
                        root: 'MypageContent_tabs-root',
                        indicator: 'MypageContent_tabs-indicator',
                    }}
                >
                    <Tab label="반려견 정보" classes={{ root: 'MypageContent_tab-root' }} />
                    <Tab label="회원 정보" classes={{ root: 'MypageContent_tab-root' }} />
                    <Tab label="이용 내역" classes={{ root: 'MypageContent_tab-root' }} />
                </Tabs>
                <Box sx={{ p: 3 }}>
                    <Routes>
                        <Route path="pet-info" element={<MypagePetInfo />} />
                        <Route path="user-info" element={<MypageUserInfo />} />
                        <Route path="used-info" element={<MypageUsedInfo />} />
                    </Routes>
                </Box>
            </Box>
        </div>
    );
}

export default MypageContent;
