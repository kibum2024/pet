import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { openPostcode } from "../../state/actions/postcodeActions";
import PostcodePopup from "../MEMBER/register/PostcodePopup";
import './MypageUserModal.css';  

const MypageUserModal = ({userInfoProp, handleCloseModal}) => {
    const [userInfo, setUserInfo] = useState(""); // 유저정보
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userRoadCode, setUserRoadCode] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userDaddress, setUserDaddress] = useState("");

    const dispatch = useDispatch();
    const { address, zonecode } = useSelector((state) => state.postcode);

    const handleOpenPopup = () => {
        dispatch(openPostcode());
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        if (zonecode) {
            setUserRoadCode(zonecode);
            setUserAddress(address);
        }
    }, [zonecode]);

    useEffect(() => {
        if (userInfoProp) {
            setUserInfo(userInfoProp[0]);
            setUserEmail(userInfoProp[0].email);
            setUserName(userInfoProp[0].u_name);
            setUserPhone(userInfoProp[0].phone);
            setUserRoadCode(userInfoProp[0].road_code);
            setUserAddress(userInfoProp[0].address);
            setUserDaddress(userInfoProp[0].d_address);
        } else {
            setUserInfo([]);
        }
    }, [userInfoProp]);

    const handleUpdateUserInfo = async () => {
        try {
            const updatedUserInfo = {
                email : userEmail,
                password: userInfo.password,
                u_name: userName,
                phone: userPhone,
                address: userAddress,
                j_date: userInfo.j_date,
                u_type: userInfo.u_type,
                newsletter: userInfo.newsletter,
                d_address: userDaddress,
                road_code: userRoadCode,
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
        <div className="MypageUserModal-wrap">
            <div className="MypageUserModal-container">
                <div className="MypageUserModal-header">회원 정보 변경</div>
                <div className="MypageUserModal-email-container">
                    <div className="MypageUserModal-label">이메일</div>
                    <div className="MypageUserModal-input-row">
                        <input type="text" value={userEmail} readOnly onChange={(event) => {setUserEmail(event.target.value)}} />
                    </div>
                </div>

                <div className="MypageUserModal-name-container">
                    <div className="MypageUserModal-label">성명</div>
                    <div className="MypageUserModal-input-row">
                        <input type="text" value={userName} onChange={(event) => {setUserName(event.target.value)}} />
                    </div>
                </div>

                <div className="MypageUserModal-contact-container">
                    <div className="MypageUserModal-label">연락처</div>
                    <div className="MypageUserModal-input-row">
                        <input type="text" value={userPhone} onChange={(event) => {setUserPhone(event.target.value)}} />
                    </div>
                </div>

                <div className="MypageUserModal-address-container">
                    <div className="MypageUserModal-label">주소</div>
                    <div className="MypageUserModal-input-container">
                        <div className="MypageUserModal-input-row postSearch">
                            <input type="text" className='MypageUserModal-input-row roadNo' value={userRoadCode} readOnly onChange={(event) => {setUserRoadCode(event.target.value)}}/>
                            <div className="MypageUserModal-button" onClick={() => (handleOpenPopup())}>우편번호 검색</div>
                        </div>
                        <div className="MypageUserModal-input-row">
                            <input type="text" value={userAddress} readOnly onChange={(event) => {setUserAddress(event.target.value)}} />
                        </div>
                        <div className="MypageUserModal-input-row">
                            <input type="text" value={userDaddress} onChange={(event) => {setUserDaddress(event.target.value)}} />
                        </div>
                    </div>
                </div>

                <div className="MypageUserModal-button-container">
                    <div className="MypageUserModal-button MypageUserModal-edit-button" onClick={handleUpdateUserInfo}>수정</div>
                    <div className="MypageUserModal-button MypageUserModal-cancel-button" onClick={handleCloseModal}>취소</div>
                </div>
            </div>
            <PostcodePopup />
        </div>
    );
};

export default MypageUserModal;
