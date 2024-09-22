import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './ServiceRecommend.css';
import serviceCardTruck1 from './images/serviceCardTruck1.png';

function ServiceRecommend() {
    const [vehicles, setVehicles] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [pet, setPet] = useState('');
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [petRegister, setPetRegister] = useState(true); //pet 등록여부를 서버에 받아서 셋팅해야 함
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/serviceRecommend1.json");
                setVehicles(response.data || []);
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
                // setPetRegister(true); // pet 등록여부를 셋팅한다 backend에서 데이터를 받아 온다
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/serviceAppointment.json");
                // email param 요청하는 로직 추가할 것
                // params: {
                //     email: email,
                // }
                setAppointments(response.data || {});
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    const petSelectedClick = (pet)  => {
        const fetchData = async () => {
            try {
                // const response = await axios.get("/data/serviceRecommend.json");  
                const response = await axios.get("/data/serviceRecommend2.json", {
                    params: {
                        pet: pet,
                    }
                });  // 선택한 pet 이름으로 추천 차량 요청하고 추천차량정보를 받는다.
                setVehicles(response.data || []);
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
                // setPetRegister(true); // pet 등록여부를 셋팅한다 backend에서 데이터를 받아 온다
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    };


    const serviceDetailClick = (vehicleData) => {
        navigate('/serviceDetail', { state: { vehicleData } }); //serviceDetail 페이지로 이동
    }

    return (
        <div className="Service_recommend-container">
            <div>
                <div className="Service_Service_title">파우핏의 추천 차량</div>
                <div className="Service_Service_description">회원님께서 등록하신 반려견의 프로필을 기반으로 하여 알맞는 차량을 추천해드립니다.</div>
                {/* 반려견 등록 */}
                { !petRegister ? (
                    <div className="Service_recommend-box1">
                        <div className="Service_recommend-title">파우핏의 추천을 받고 싶다면?</div>
                        <div className="Service_register-button">
                            <span className="Service_register-button-text">반려견 등록</span>
                        </div>
                    </div>
                ) :
                (
                    <div className="Service_recommend-box2">
                        <div className="Service_profile-title">반려견 프로필을 선택해 주세요.</div>
                        <div className='Service_select-box-wrap'>
                            <div className="Service_select-box">
                                <select className="Service_select" name="" id="" onChange={(event) => setPet(event.target.value)}>
                                    {appointments.map((appointment, index) => (
                                        <option key={index} value={appointment.p_name}>{appointment.p_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="Service_profile-button" onClick={() => petSelectedClick(pet)}>
                                <span className="Service_profile-button-text">선택</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="Service_Service_link">
                    <Link to="/serviceList">차량 목록 보기</Link>
                </div>

            </div>
            { !petRegister && (
                <div className="Service_best-section1">
                    <h1>BEST 차량</h1>
                    <div>
                        <ul className="Service_vehicles">
                            {vehicles.length > 0 ? vehicles.map((vehicle, index) => (
                                <li className="Service_vehicle" key={index}>
                                    <img src={serviceCardTruck1} alt="트럭 이미지" className="Service_vehicle-img" />
                                    <div className="Service_vehicle-tag">NO. {vehicle.v_num}</div>
                                    <div className="Service_vehicle-name">{vehicle.v_name}</div>
                                    <div className="Service_vehicle-desc">
                                        # 대형견 전문  # 마스터 차량
                                        <br />
                                        # 검진부터 훈육까지
                                    </div>
                                    <div onClick={() => {serviceDetailClick(vehicle)}}>
                                        <span className="Service_view-button">자세히보기</span>
                                    </div>
                                </li>
                            )) : <div>추천 차량이 없습니다.</div>}
                        </ul>
                    </div>
                </div>
            )}
            { petRegister && (
                <div className="Service_best-section2">
                    <h1>추천 차량</h1>
                    <div>
                        <ul style={{ display: 'flex' }} className="Service_vehicles">
                            {vehicles.length > 0 ? vehicles.map((vehicle, index) => (
                                <li className="Service_vehicle" key={index}>
                                    <img src={serviceCardTruck1} alt="트럭 이미지" className="Service_vehicle-img" />
                                    <div className="Service_vehicle-tag">NO. {vehicle.v_num}</div>
                                    <div className="Service_vehicle-name">{vehicle.v_name}</div>
                                    <div className="Service_vehicle-desc">
                                        # 대형견 전문  # 마스터 차량
                                        <br />
                                        # 검진부터 훈육까지
                                    </div>
                                    <div onClick={() => {serviceDetailClick(vehicle)}}>
                                        <span className="Service_view-button">자세히보기</span>
                                    </div>
                                </li>
                            )) : <div>추천 차량이 없습니다.</div>}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServiceRecommend;