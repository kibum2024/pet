import React, { useState, useEffect } from 'react';
import axios from "axios"; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ServiceModal.css';  // CSS 파일을 따로 관리

const ServiceModal = ({ handleCloseModal }) => {
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
                const response = await axios.get("/data/serviceAppointment.json");
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

    const appointmentClick = async () => {
        try {
            const response = await axios.post('/users/appointmenSave', {
                sv_appointmentDate: appointmentDate,
                sv_appointmentTime: appointmentTime,
                sv_userName: userName,
                sv_phone: phone,
                sv_address1: address1,
                sv_address2: address2,
                sv_patName: patName 
            }); // sv_appointmentDate: appointmentDate, sv_컬럼명은 서버에서 정의한 컬럼명 나중에 수정, 저장항목에 따라서 컬럼 수 조정필요
                // /users/appointmenSave 서버경로에 맞게 수정(controller)
            return true;
          } catch (error) {
            alert("예약정보 저장를 실패하였습니다. 다시 등록해 주세요.");
            return false;
          }
    }

    return (
        <div className="ServiceModal_modal-overlay" onClick={handleCloseModal}>
            <div className="ServiceModal_modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="ServiceModal_modal-header">예약 정보 입력</div>
                <div className="ServiceModal_modal-body">
                    <div className="ServiceModal_input-group-row">
                        <div className="ServiceModal_input-group">
                            <label>날짜</label>
                            <DatePicker
                                selected={appointmentDate}
                                // onChange={(event) => {console.log("event.target.value : ", event.target.value)}}
                                onChange={(date) => setAppointmentDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div className="ServiceModal_input-group">
                            <label>시간</label>
                            <select name="" id="" className='ServiceModal_time' onChange={(event) => setAppointmentTime(event.target.value)}>
                                <option value="13">13</option>
                                <option value="16">16</option>
                                <option value="19">19</option>
                            </select>
                        </div>
                    </div>
                    <div className="ServiceModal_input-group-row">
                        <div className="ServiceModal_input-group">
                            <label>예약자</label>
                            {/* appointments.u_name이 없을 경우 빈 문자열 처리 */}
                            <input type="text" value={appointments[0].u_name || ''} onChange={(event) => setUserName(event.target.value)} />
                        </div>
                        <div className="ServiceModal_input-group">
                            <label>연락처</label>
                            <input type="text" value={appointments[0].phone || ''} onChange={(event) => setPhone(event.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="ServiceModal_input-group">
                        <label>반려견</label>
                        <select name="" id="" onChange={(event) => setPatName(event.target.value)}>
                            {appointments.map((appointment, index) => (
                                <option key={index} value={appointment.p_name}>{appointment.p_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="ServiceModal_address-group">
                        <label>주소</label>
                        <input type="text" value={appointments[0].road_code || ''} onChange={(event) => setRoadCode(event.target.value)}/>
                    </div>
                    <div className="ServiceModal_input-group">
                        <input type="text" value={appointments[0].address1 || ''} onChange={(event) => setAddress1(event.target.value)}/>
                    </div>
                    <div className="ServiceModal_input-group">
                        <input type="text" value={appointments[0].address2 || ''} onChange={(event) => setAddress2(event.target.value)}/>
                    </div>
                    <div className="ServiceModal_modal-note">* 예약 확정 후 취소가 어려우니 신중하게 예약해주세요</div>
                </div>

                <div className="ServiceModal_modal-footer" onClick={() => appointmentClick()}>
                    <button className="ServiceModal_reserve-button">예약하기</button>
                </div>
                <div className="ServiceModal_cancel-reservation" onClick={handleCloseModal}>다음에 하기</div> {/* 클릭 시 모달 닫힘 */}
            </div>
        </div>
    );
}

export default ServiceModal;
