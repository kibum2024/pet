import React, { useState } from 'react';
import axios from 'axios';
import './MypageUserInfo.css';
import MypageUserModal from './MypageUserModal';
import MypagePasswordModal from './MypagePasswordModal';
import MypageUserDeleteModal from './MypageUserDeleteModal';
import mypageUserIcon from './images/mypageUserIcon.png';
import mypagePawIcon from './images/mypagePawIcon.png';
import mypageAccountIcon from './images/mypageAccountIcon.png';

function MypageUserInfo() {
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(''); // 유저정보
    const [isUserModal, setIsUserModal] = useState(false); // 유저정보 변경 모달창 상태
    const [isPasswordModal, setIsPasswordModal] = useState(false); // 비밀번호 변경 모달창 상태
    const [isUserDeleteModal, setIsUserDeleteModal] = useState(false); // 계정 삭제 모달창 상태
    const [password, setPassword] = useState(''); // 비밀번호 입력 상태
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // 비밀번호 일치 여부


    const fetchPasswordData = async () => {
        try {
            const response = await axios.get("/data/mypageUserInfo.json");
            if (response.data) {
                setUserInfo(response.data);
                if (password === response.data[0].password) {
                    setIsPasswordCorrect(true); // 비밀번호가 맞으면 상태를 변경
                    setError('');
                } else {
                    setError('비밀번호가 일치하지 않습니다.');
                    alert('비밀번호가 일치하지 않습니다. 확인 후 다시 입력바랍니다.');
                }
            }
            setLoading(false);
        } catch (error) {
            setError("데이터를 불러오는데 실패했습니다.");
            setLoading(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const userInfoClick = () => {
        setIsUserModal(!isUserModal);
    }

    const passwordChangeClick = () => {
        setIsPasswordModal(!isPasswordModal);
    }

    const userDeleteChangeClick = () => {
        setIsUserDeleteModal(!isUserDeleteModal);
    }

    return (
        <div className="MypageUserInfo_content-container">
            <div className="MypageUserInfo_userInfototal-container">
                {!isPasswordCorrect ? (
                    // 비밀번호 입력 화면
                    <div className="MypageUserInfo_userInfo-container">
                        <div className="MypageUserInfo_userInfo-title">비밀번호 입력</div>
                        <input
                            className="MypageUserInfo_userInfo-passwordInput"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {error && <div className="MypageUserInfo_userInfo-error">{error}</div>}
                        <div className="MypageUserInfo_userInfo-button" onClick={fetchPasswordData}>
                            <div className="MypageUserInfo_userInfo-buttonText">확인</div>
                        </div>
                    </div>
                ) : (
                    // 비밀번호가 맞으면 회원 정보 변경 화면
                    <div className="MypageUserInfo_user-info-options">
                        <div className="MypageUserInfo_userInfo-box" onClick={() => userInfoClick()}>
                            <div>
                                <img src={mypageUserIcon} alt="회원 정보 변경 아이콘" className="MypageUserInfo_userInfo-icon" />
                            </div>
                            <div className="MypageUserInfo_userInfo-box-text">회원정보 변경</div>
                        </div>
                        <div className="MypageUserInfo_userInfo-box" onClick={() => passwordChangeClick()}>
                            <div>
                                <img src={mypagePawIcon} alt="비밀번호 변경 아이콘" className="MypageUserInfo_userInfo-icon" />
                            </div>
                            <div className="MypageUserInfo_userInfo-box-text">비밀번호 변경</div>
                        </div>
                        <div className="MypageUserInfo_userInfo-box" onClick={() => userDeleteChangeClick()}>
                            <div>
                                <img src={mypageAccountIcon} alt="계정 삭제 아이콘" className="MypageUserInfo_userInfo-icon" />
                            </div>
                            <div className="MypageUserInfo_userInfo-box-text">계정 삭제</div>
                        </div>
                    </div>
                )}
            </div>
            {isUserModal && (<MypageUserModal
                userInfoProp = {userInfo}
                handleCloseModal={userInfoClick}
            />)}
            {isPasswordModal && (<MypagePasswordModal
                userInfoProp = {userInfo}
                handleCloseModal={passwordChangeClick}
            />)}
            {isUserDeleteModal && (<MypageUserDeleteModal
                userInfoProp = {userInfo}
                handleCloseModal={userDeleteChangeClick}
            />)}
        </div>
    );
}

export default MypageUserInfo;
