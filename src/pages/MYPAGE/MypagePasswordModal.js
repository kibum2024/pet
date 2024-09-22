import React, { useState, useEffect } from 'react';
import './MypagePasswordModal.css';  // 분리된 CSS 파일을 import

const MypagePasswordModal = ({userInfoProp, handleCloseModal}) => {
    const [userInfo, setUserInfo] = useState(""); // 유저정보
    const [userPassword, setUserPassword] = useState(""); 
    const [userComfirmPassword, setUserComfirmPassword] = useState(""); 

    useEffect(() => {
        if (userInfoProp) {
            setUserInfo(userInfoProp[0]);
        } else {
            setUserInfo("");
        }
    }, [userInfoProp]);

    const handleUpdateUserInfo = async () => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;
        
        if (regex.test(userPassword) && regex.test(userComfirmPassword)) {
          if (userPassword !== userComfirmPassword) {
            alert("비밀번호가 확인비밀번호와 일치하지 않습니다.");
            return "";
          }
        } else {
          if (!regex.test(userPassword)) {
            alert("비밀번호는 최대 8자 이상, 대문자 1자와 특수문자 1자 이상 포함되어야 합니다.");
            return "";
          }
          if (!regex.test(userComfirmPassword)) {
            alert("비밀번호는 최대 8자 이상, 대문자 1자와 특수문자 1자 이상 포함되어야 합니다.");
            return "";
          }
        }
        
        try {
            const updatedUserInfo = {
                email : userInfo.email,
                password: userPassword,
            };
            
            // await axios.put(`/api/userinfo/${userEmail}`, updatedUserInfo);
            alert('사용자정보가 성공적으로 수정되었습니다.');
            handleCloseModal();
        } catch (error) {
            console.error('사용자정보 수정 중 오류 발생:', error);
            alert('사용자정보 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="MypagePasswordModal-wrap">
            <div className="MypagePasswordModal-container">
                <div className="MypagePasswordModal-header">비밀번호 변경</div>
                <div className="MypagePasswordModal-email-container">
                    <div className="MypagePasswordModal-label">변경 비밀번호</div>
                    <div className="MypagePasswordModal-input-row">
                        <input type="password" value={userPassword} onChange={(event) => {setUserPassword(event.target.value)}} />
                    </div>
                </div>

                <div className="MypagePasswordModal-name-container">
                    <div className="MypagePasswordModal-label">변경 비밀번호 확인</div>
                    <div className="MypagePasswordModal-input-row">
                        <input type="password" value={userComfirmPassword} onChange={(event) => {setUserComfirmPassword(event.target.value)}} />
                    </div>
                </div>

                <div className="MypagePasswordModal-button-container">
                    <div className="MypagePasswordModal-button MypagePasswordModal-edit-button" onClick={handleUpdateUserInfo}>수정</div>
                    <div className="MypagePasswordModal-button MypagePasswordModal-cancel-button" onClick={handleCloseModal}>취소</div>
                </div>
            </div>
        </div>
    );
};

export default MypagePasswordModal;
