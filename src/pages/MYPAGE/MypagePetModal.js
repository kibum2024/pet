import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MypagePetModal.css';

const MypagePetModal = ({ petProp, handleCloseModal, onUpdatePet, onDeletePet, onRegisterPet }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [pet, setPet] = useState(false);
    const [isPet, setIsPet] = useState(false);
    const [selectedPetNum, setSelectedPetNum] = useState("");
    const [selectedVNum, setSelectedVNum] = useState("");
    const [selectedPetName, setSelectedPetName] = useState("");
    const [selectedPetImg, setSelectedPetImg] = useState("");
    const [selectedBreed, setSelectedBreed] = useState("");
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("");
    const [selectedSType, setSelectedSType] = useState("");
    const [selectedCSize, setSelectedCSize] = useState("");
    const [selectedSkin, setSelectedSkin] = useState("");
    const [selectedDisease, setSelectedDisease] = useState("");
    const [selectedTraining, setSelectedTraining] = useState("");

    useEffect(() => {
        if (petProp) {
            setIsPet(true);
            setPet(petProp);
            setSelectedPetNum(petProp.p_num);
            setSelectedPetName(petProp.p_name);
            setSelectedPetImg(petProp.p_img);
            setSelectedBreed(petProp.breed);
            setSelectedAge(petProp.age);
            setSelectedWeight(petProp.weight);
            setSelectedSkin(petProp.skin);
            setSelectedDisease(petProp.disease);
            setSelectedTraining(petProp.training);
            setSelectedSType(petProp.s_type);
            setSelectedCSize(petProp.c_size);
            setSelectedVNum(petProp.v_num);
        } else {
            setIsPet(false);
            setPet([]);
        }
    }, [petProp]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const determineCSize = (weight) => {
        if (weight < 4) {
            return '소';
        } else if (weight >= 4 && weight < 20) {
            return '중';
        } else {
            return '대';
        }
    };

    const determineSType = () => {
        if (selectedSkin === "해당없음" && selectedDisease === "해당없음" && selectedTraining === "해당없음") {
            return '일반';
        } else if (selectedSkin !== "해당없음" || selectedDisease !== "해당없음") {
            if (selectedTraining !== "해당없음") {
                return '마스터';
            }
            return '수의사';
        } else if (selectedTraining !== "해당없음") {
            return '훈련사';
        } else {
            return '일반';
        }
    };

    const handleUpdatePet = async () => {
        try {
            const updatedPet = {
                p_num : selectedPetNum,
                p_name: selectedPetName,
                p_img: selectedPetImg,
                breed: selectedBreed,
                age: selectedAge,
                weight: selectedWeight,
                skin: selectedSkin,
                disease: selectedDisease,
                training: selectedTraining,
                s_type: determineSType(),
                c_size: determineCSize(parseFloat(selectedWeight)),
                v_num: selectedVNum,
            };
            
            // await axios.put(`/api/pets/${petProp.p_num}`, updatedPet);
            onUpdatePet(updatedPet);  
            alert('펫 정보가 성공적으로 수정되었습니다.');
            handleCloseModal();
        } catch (error) {
            console.error('펫 수정 중 오류 발생:', error);
            alert('펫 수정 중 오류가 발생했습니다.');
        }
    };

    const handleDeletePet = async () => {
        const confirmDelete = window.confirm('정말로 이 반려견 정보를 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                // await axios.delete(`/api/pets/${petProp.p_num}`);
                onDeletePet(petProp.p_num);  
                alert('펫 정보가 성공적으로 삭제되었습니다.');
                handleCloseModal();
            } catch (error) {
                console.error('펫 삭제 중 오류 발생:', error);
                alert('펫 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const handleRegisterPet = async () => {
        try {
            const newPet = {
                p_num : "9",
                p_name: selectedPetName,
                p_img: selectedPetImg,
                breed: selectedBreed,
                age: selectedAge,
                weight: selectedWeight,
                skin: selectedSkin,
                disease: selectedDisease,
                training: selectedTraining,
                s_type: determineSType(),
                c_size: determineCSize(parseFloat(selectedWeight)),
                v_num: null,
            };
            
            // await axios.post('/api/pets', newPet);
            onRegisterPet(newPet);  
            alert('펫 정보가 성공적으로 등록되었습니다.');
            handleCloseModal();
        } catch (error) {
            console.error('펫 등록 중 오류 발생:', error);
            alert('펫 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="MypagePetModal_modal-overlay" onClick={handleCloseModal}>
            <div className="MypagePetModal_modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="MypagePetModal_modal-header">반려견 정보</div>
                <div className="MypagePetModal_modal-body">
                    <div className="MypagePetModal_left-section">
                        <div className="MypagePetModal_photo-upload">
                            <label htmlFor="fileInput" className="MypagePetModal_upload-label">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="미리보기" className="MypagePetModal_image-preview" />
                                ) : (
                                    <div className="MypagePetModal_placeholder">
                                        <span>사진 등록</span>
                                    </div>
                                )}
                            </label>
                            <input 
                                type="file" 
                                id="fileInput" 
                                className="MypagePetModal_file-input" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                            />
                        </div>

                        <div className="MypagePetModal_input-group-pet">
                            <label>견종</label>
                            <input type="text" value={selectedBreed} onChange={(event) => {setSelectedBreed(event.target.value)}} />
                        </div>
                    </div>

                    <div className="MypagePetModal_input-section">
                        <div className="MypagePetModal_input-group">
                            <label>이름</label>
                            <input type="text" value={selectedPetName} onChange={(event) => {setSelectedPetName(event.target.value)}} />
                        </div>
                        <div className="MypagePetModal_input-group">
                            <label>나이 (숫자만 입력)</label>
                            <input type="text" value={selectedAge} onChange={(event) => {setSelectedAge(event.target.value)}}/>
                        </div>
                        <div className="MypagePetModal_input-group">
                            <label>무게 (숫자만 입력)</label>
                            <input type="text" value={selectedWeight} onChange={(event) => {setSelectedWeight(event.target.value)}}/>
                        </div>
                        <div className="MypagePetModal_input-group">
                            <label>피부상태</label>
                            <select onChange={(event) => {setSelectedSkin(event.target.value)}} value={selectedSkin}>
                                <option value="해당없음">해당없음</option>
                                <option value="피부 알레르기">피부 알레르기</option>
                                <option value="피부염 및 아토피성 피부염">피부염 및 아토피성 피부염</option>
                                <option value="벼룩 또는 진드기 알레르기">벼룩 또는 진드기 알레르기</option>
                                <option value="건성 피부">건성 피부</option>
                                <option value="지루성 피부염">지루성 피부염</option>
                                <option value="곰팡이성 감염">곰팡이성 감염</option>
                                <option value="탈모증">탈모증</option>
                            </select>
                        </div>
                        <div className="MypagePetModal_input-group">
                            <label>기저질환</label>
                            <select onChange={(event) => {setSelectedDisease(event.target.value)}} value={selectedDisease}>
                                <option value="해당없음">해당없음</option>
                                <option value="심장병">심장병</option>
                                <option value="호흡기">호흡기</option>
                                <option value="천식">천식</option>
                                <option value="기침">기침</option>
                            </select>
                        </div>
                        <div className="MypagePetModal_input-group">
                            <label>행동교정</label>
                            <select onChange={(event) => {setSelectedTraining(event.target.value)}} value={selectedTraining}>
                                <option value="해당없음">해당없음</option>
                                <option value="공포증">공포증</option>
                                <option value="불안감">불안감</option>
                                <option value="과잉 행동">과잉 행동</option>
                                <option value="사회화 부족">사회화 부족</option>
                            </select>
                        </div>
                    </div>
                </div>
                {(isPet) ? 
                    (
                        <>
                            <div className="MypagePetModal_modal-footer">
                                <button className="MypagePetModal_reserve-button" onClick={handleUpdatePet}>수정하기</button>
                                <button className="MypagePetModal_reserve-button" onClick={handleDeletePet}>삭제하기</button>
                            </div>
                            <div className="MypagePetModal_cancel-reservation" onClick={handleCloseModal}>닫기</div>
                        </>
                    ) : (
                        <>
                            <div className="MypagePetModal_modal-footer">
                                <button className="MypagePetModal_reserve-button" onClick={handleRegisterPet}>등록하기</button>
                            </div>
                            <div className="MypagePetModal_cancel-reservation" onClick={handleCloseModal}>다음에 하기</div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default MypagePetModal;
