import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MypageAppointmentState from './MypageAppointmentState';
import MypageRegisterReviewModal from './MypageRegisterReviewModal';
import './MypageUsedInfo.css';
import mypageAppointTruck from './images/mypageAppointTruck.png';
import mypageAppointmentCheck from './images/mypageAppointmentCheck.png';

function MypageUsedInfo() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [appointmentNo, setAppointmentNo] = useState("");
    const [isAppointmentModal, setIsAppointmentModal] = useState(false); //예약내역
    const [isReviewModal, setIsReviewModal] = useState(false); //리뷰작성


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/serviceAppointmentState.json");
                setAppointments(response.data || []); // 데이터가 있으면 세팅, 없으면 빈 배열
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    const processState = (step_state, a_date, c_date) => {
        const a_dateConvert = a_date.slice(0, 10);

        if (step_state === "1") {
            return "케어신청(" + a_dateConvert + ")";
        } else if (step_state === "2") {
            return "예약확정(" + a_dateConvert + ")";
        } else if (step_state === "3") {
            return "케어진행(" + c_date + ")";
        } else if (step_state === "4") {
            return "이용완료(" + c_date + ")";
        }
        return null;
    }

    const userAppointmentClick = (a_num) => {
        setIsAppointmentModal(!isAppointmentModal);
        setAppointmentNo(a_num);
    }

    const userReviewClick = () => {
        setIsReviewModal(!isReviewModal);
    }

    return (
        <div className="MypageUsedInfo_content-container">
            <div className='mypage-container-wrap'>
                {appointments.map((appointment, index) => (
                    <div key={index}>
                        <div className='mypage-step-state'>
                            {
                                processState(appointment.step_state, appointment.a_date, appointment.c_date)
                            }
                        </div>
                        <div className="mypage-container">
                            <img className="mypage-img" src={mypageAppointTruck} alt="이미지" />
                            <div className="mypage-info-container">
                                <div className="mypage-info-row">
                                    <div className="mypage-tag">
                                        <div className="mypage-tag-text">{appointment.v_num}</div>
                                    </div>
                                    <div className="mypage-title">{appointment.v_name}</div>
                                </div>
                                <div className="mypage-steps">
                                    <div className="mypage-step-labels">
                                        <div className="mypage-step-label" style={{ left: '-4px' }}>케어 신청</div>
                                        <div className="mypage-step-label" style={{ left: '88.3px' }}>예약 확정</div>
                                        <div className="mypage-step-label" style={{ left: '186.6px' }}>케어 진행</div>
                                        <div className="mypage-step-label" style={{ left: '282.9px' }}>이용 완료</div>
                                    </div>
                                    <div className="mypage-step-bar">
                                        <div className="mypage-progress" style={{ left: '23.66px', top: '12px' }}></div>
                                        <div className="mypage-progress" style={{ left: '120px', top: '12px' }}></div>
                                        <div className="mypage-progress" style={{ left: '216.34px', top: '12px' }}></div>
                                        <div className={appointment.step_state >= "1" ? "mypage-step-circle-active" : "mypage-step-circle-inactive"} style={{ left: '0' }}>
                                            {appointment.step_state >= "1" ? (
                                                <div style={{ width: '18px', height: '20px  ', border: 'none' }}>
                                                    <img src={mypageAppointmentCheck} alt="" style={{ width: '18px', height: '14px' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '16px', height: '16px  ', border: 'none' }}>
                                                    <div style={{ width: '16px', height: '16px', background: '#0059FF', borderRadius: '9999px' }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={appointment.step_state >= "2" ? "mypage-step-circle-active" : "mypage-step-circle-inactive"} style={{ left: '96px' }}>
                                            {appointment.step_state >= "2" ? (
                                                <div style={{ width: '18px', height: '20px  ', border: 'none' }}>
                                                    <img src={mypageAppointmentCheck} alt="" style={{ width: '18px', height: '14px' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '16px', height: '16px  ', border: 'none' }}>
                                                    <div style={{ width: '16px', height: '16px', background: '#0059FF', borderRadius: '9999px' }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={appointment.step_state >= "3" ? "mypage-step-circle-active" : "mypage-step-circle-inactive"} style={{ left: '192px' }}>
                                            {appointment.step_state >= "3" ? (
                                                <div style={{ width: '18px', height: '20px  ', border: 'none' }}>
                                                    <img src={mypageAppointmentCheck} alt="" style={{ width: '18px', height: '14px' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '16px', height: '16px  ', border: 'none' }}>
                                                    <div style={{ width: '16px', height: '16px', background: '#0059FF', borderRadius: '9999px' }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className={appointment.step_state >= "4" ? "mypage-step-circle-active" : "mypage-step-circle-inactive"} style={{ left: '288px' }}>
                                            {appointment.step_state >= "4" ? (
                                                <div style={{ width: '18px', height: '20px  ', border: 'none' }}>
                                                    <img src={mypageAppointmentCheck} alt="" style={{ width: '18px', height: '14px' }} />
                                                </div>
                                            ) : (
                                                <div style={{ width: '16px', height: '16px  ', border: 'none' }}>
                                                    <div style={{ width: '16px', height: '16px', background: '#0059FF', borderRadius: '9999px' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mypage-button-container">
                                <div className="mypage-button mypage-button-secondary">
                                    <div className="mypage-button-text" onClick={() => userAppointmentClick(appointment.a_num)}>신청 내역</div>
                                </div>
                                <div className="mypage-button mypage-button-primary">
                                    <div className="mypage-button-text" onClick={() => userReviewClick()}>{(appointment.r_rating) ?  "후기수정" : "후기작성"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isAppointmentModal && (<MypageAppointmentState
                appointmentNoProp = {appointmentNo}
                handleCloseModal={userAppointmentClick}
            />)}
            {isReviewModal && (<MypageRegisterReviewModal
                userInfoProp = {appointmentNo}
                handleCloseModal={userReviewClick}
            />)}
        </div>
    );
}

export default MypageUsedInfo;
