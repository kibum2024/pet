import React, { useState, useEffect } from 'react';
import './MypageUserDeleteModal.css'; 

const MypageUserDeleteModal = ({userInfoProp, handleCloseModal}) => {
    const [userInfo, setUserInfo] = useState(""); // 유저정보
    const [userPassword, setUserPassword] = useState(""); 
    const [UserWithdrawal, setUserWithdrawal] = useState(""); 

    useEffect(() => {
        if (userInfoProp) {
            setUserInfo(userInfoProp[0]);
        } else {
            setUserInfo("");
        }
    }, [userInfoProp]);

    const handleDeleteUserInfo = async () => {
        if (userInfo.password !== userPassword) {
            alert('비밀번호가 틀립니다. 다시 입력바랍니다.');
            return "";
        }
        const confirmDelete = window.confirm('정말로 이 사용자 정보를 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                // await axios.delete(`/api/userinfo/${userInfo.email}`);
                alert('사용자정보가 성공적으로 삭제되었습니다.');
                handleCloseModal();
            } catch (error) {
                console.error('사용자정보 삭제 중 오류 발생:', error);
                alert('사용자 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="MypageUserDeleteModal-wrap">
            <div className="MypageUserDeleteModal-container">
                <div className="MypageUserDeleteModal-header">계정 삭제</div>
                <div className="MypageUserDeleteModal-email-container">
                    <div className="MypageUserDeleteModal-label">탈퇴 이유</div>
                    <div className="MypageUserDeleteModal-input-row">
                        <input type="text" value={UserWithdrawal} onChange={(event) => {setUserWithdrawal(event.target.value)}}/>
                    </div>
                </div>

                <div className="MypageUserDeleteModal-name-container">
                    <div className="MypageUserDeleteModal-label">비밀번호</div>
                    <div className="MypageUserDeleteModal-input-row">
                        <input type="text" value={userPassword} onChange={(event) => {setUserPassword(event.target.value)}}/>
                    </div>
                </div>

                <div className="MypageUserDeleteModal-button-container">
                    <div className="MypageUserDeleteModal-button MypageUserDeleteModal-edit-button" onClick={handleDeleteUserInfo}>삭제</div>
                    <div className="MypageUserDeleteModal-button MypageUserDeleteModal-cancel-button" onClick={handleCloseModal}>취소</div>
                </div>
            </div>
        </div>
    );
};

export default MypageUserDeleteModal;
