import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './MypagePetInfo.css';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/actions/modalActions';
import MypagePetModal from './MypagePetModal';
import mypagePetImg from './images/mypagePetImg.png';

function MypagePetInfo() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [value, setValue] = useState(0);
    const [isProfileRegistered, setIsProfileRegistered] = useState(false); // 프로필 등록 여부 상태
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const location = useLocation(); // useLocation 사용하여 navigate 상태 받기

    const fetchPetsData = async () => {
        try {
            const response = await axios.get("/data/mypagePet.json");
            if (response.data) {
                setPets(response.data);
                setIsProfileRegistered(true);
            } else {
                setPets([]);
                setIsProfileRegistered(false);
            }
            setLoading(false);
        } catch (error) {
            setError("데이터를 불러오는데 실패했습니다.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPetsData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenModal = (pet) => {
        setSelectedPet(pet);
        dispatch(openModal()); // 모달 열기
        document.body.style.overflow = 'hidden';  // 모달창이 열렸을때 외부화면 스크롤 막기
    };

    const handleCloseModal = () => {
        dispatch(closeModal()); // 모달 닫기
        document.body.style.overflow = 'auto';  // 모달창이 열렸을때 외부화면 스크롤 가능하게
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // // 반려견 정보 수정 후 서버 데이터를 다시 불러옴
    // const handlePetUpdate = async () => {
    //     await fetchPetsData();  // 수정 후 최신 데이터를 불러옴
    //     handleCloseModal();
    // };

    // // 반려견 정보 삭제 후 서버 데이터를 다시 불러옴
    // const handlePetDelete = async () => {
    //     await fetchPetsData();  // 삭제 후 최신 데이터를 불러옴
    //     handleCloseModal();
    // };

    // // 반려견 정보 등록 후 서버 데이터를 다시 불러옴
    // const handlePetRegister = async () => {
    //     await fetchPetsData();  // 등록 후 최신 데이터를 불러옴
    //     handleCloseModal();
    // };

    // 반려견 정보 수정 후 상태 업데이트
    const handlePetUpdate = (updatedPet) => {
        setPets((prevPets) => prevPets.map(pet => pet.p_num === updatedPet.p_num ? updatedPet : pet));
    };

    // 반려견 정보 삭제 후 상태 업데이트
    const handlePetDelete = (deletedPetId) => {
        setPets((prevPets) => prevPets.filter(pet => pet.p_num !== deletedPetId));
    };

    // 반려견 정보 등록 후 상태 업데이트
    const handlePetRegister = (newPet) => {
        setPets((prevPets) => [...prevPets, newPet]);
    };

    return (
        <div className="MypagePetInfo_content-container">
            <div className="MypagePetInfo_pet-container">
                {isProfileRegistered ? (
                    <div className="MypagePetInfo_pet-profile">
                        {pets.map((pet, index) => (
                            <div key={index} className="MypagePetInfo_pet-card">
                                <img src={mypagePetImg} alt="반려견 이미지" />
                                <div className="MypagePetInfo_pet-info">
                                    <span>{pet.p_name}</span>
                                </div>
                                <div className="MypagePetInfo_pet-overlay" onClick={() => { handleOpenModal(pet) }}>
                                    <span>프로필 상세정보</span>
                                </div>
                            </div>
                        ))}
                        <div className="MypagePetInfo_pet-card1">
                            <div className="MypagePetInfo_pet-button" onClick={() => { handleOpenModal(null) }}>
                                <div className="MypagePetInfo_pet-button-text">반려견 등록</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="MypagePetInfo_pet-card1">
                        <div className="MypagePetInfo_pet-button" onClick={() => { handleOpenModal(null) }}>
                            <div className="MypagePetInfo_pet-button-text">반려견 등록</div>
                        </div>
                    </div>
                )}
            </div>
            {isModalOpen && (<MypagePetModal
                petProp={selectedPet}
                handleCloseModal={handleCloseModal}
                onUpdatePet={handlePetUpdate}
                onDeletePet={handlePetDelete}
                onRegisterPet={handlePetRegister}
            />)}
        </div>
    );
}

export default MypagePetInfo;
