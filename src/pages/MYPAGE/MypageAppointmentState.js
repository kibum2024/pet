import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './MypageAppointmentState.css';  // CSS 파일을 따로 관리

const MypageAppointmentState = ({ appointmentNoProp, handleCloseModal }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [roadCode, setRoadCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [patName, setPatName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/mypageAppointment.json");
                // appointmentNoProp 예약번호를 서버에 전달하도록 수정할 것
                setAppointments(response.data || {});
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    // 로딩 중일 때나 오류 발생 시
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    const appointmentDeleteClick = async () => {

        const confirmDelete = window.confirm('정말로 이 예약정보를 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                // await axios.delete(`/api/appointmentdelete/${appointments.a_num}`);
                //예약번호로 삭제되게 수정할 것
                alert('예약정보가 성공적으로 삭제되었습니다.');
                handleCloseModal();
            } catch (error) {
                console.error('예약정보 삭제 중 오류 발생:', error);
                alert('예약정보 삭제 중 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="MypageAppointmentState-modal-overlay" onClick={handleCloseModal}>
            <div className="MypageAppointmentState-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="MypageAppointmentState-modal-header">예약 상세 내역</div>
                <div className="MypageAppointmentState-appointment-no">예약번호: {appointments[0].a_num || ''}</div>
                <div className="MypageAppointmentState-appointment-date">신청일시: {appointments[0].a_date.replace('T', ' ').replace('.000Z', '') || ''}</div>
                <div className="MypageAppointmentState-modal-body">
                    <div className="MypageAppointmentState-input-group-row">
                        <div className="MypageAppointmentState-input-group">
                            <label>날짜</label>
                            <div>
                                <DatePicker
                                    selected={appointmentDate}
                                    onChange={(date) => setAppointmentDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    className="MypageAppointmentState-input-date"
                                />
                            </div>
                        </div>
                        <div className="MypageAppointmentState-input-group">
                            <label>시간</label>
                            <select name="" id="" className='MypageAppointmentState-time' onChange={(event) => setAppointmentTime(event.target.value)}>
                                <option value="13">13</option>
                                <option value="16">16</option>
                                <option value="19">19</option>
                            </select>
                        </div>
                    </div>
                    <div className="MypageAppointmentState-input-group-row">
                        <div className="MypageAppointmentState-input-group">
                            <label>예약자</label>
                            <input type="text" value={appointments[0].u_name || ''} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="MypageAppointmentState-input-group">
                            <label>연락처</label>
                            <input type="text" value={appointments[0].phone || ''} onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="MypageAppointmentState-input-group">
                        <label>반려견</label>
                        <select name="" id="" onChange={(event) => setPatName(event.target.value)}>
                            {appointments.map((appointment, index) => (
                                <option key={index} value={appointment.p_name}>{appointment.p_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="MypageAppointmentState-address-group">
                        <label>주소</label>
                        <input className='MypageAppointmentState-loadCode' type="text" readOnly value={appointments[0].road_code || ''} onChange={(event) => setRoadCode(event.target.value)}/>
                    </div>
                    <div className="MypageAppointmentState-input-group">
                        <input type="text" value={appointments[0].address1 || ''} readOnly onChange={(event) => setAddress1(event.target.value)}/>
                    </div>
                    <div className="MypageAppointmentState-input-group">
                        <input type="text" value={appointments[0].address2 || ''} readOnly onChange={(event) => setAddress2(event.target.value)}/>
                    </div>
                </div>

                <div className="MypageAppointmentState-modal-footer" onClick={() => appointmentDeleteClick()}>
                    <button className="MypageAppointmentState-reserve-button">예약취소</button>
                </div>
                <div className="MypageAppointmentState-cancel-reservation" onClick={handleCloseModal}>창 닫기</div> {/* 클릭 시 모달 닫힘 */}
            </div>
        </div>
    );
}

export default MypageAppointmentState;
