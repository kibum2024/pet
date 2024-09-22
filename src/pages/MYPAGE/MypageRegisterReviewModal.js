import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Rating } from '@mui/material';
import './MypageRegisterReviewModal.css';

const MypageRegisterReviewModal = ({ appointmentNoProp, handleCloseModal }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [reviewStat, setReviewStat] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/mypageAppointment.json");
                // appointmentNoProp 예약번호를 서버에 전달하도록 수정할 것
                if (response.data) {
                    setAppointments(response.data);
                    setRating(response.data[0].r_rating);
                    setReview(response.data[0].comments);
                    setReviewStat(true);
                } else {
                    setAppointments([])
                    setRating("");
                    setReview("");
                    setReviewStat(false);
                }
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

    const handleRegisterReview = async () => {
        try {
            const newReview = {
                a_num: appointments[0].a_num,
                email: appointments[0].email,
                v_num: appointments[0].v_num,
                r_rating: rating,
                comments: review,
                review_stat: reviewStat,
            };
            // review_stat가 true면 수정, false면 신규등록 구분하므로 서버에서 상태에 따라 update, insert처리해야 함

            // await axios.post('/api/review', newReview);
            alert('리뷰가 성공적으로 등록되었습니다.');
            handleCloseModal();
        } catch (error) {
            console.error('리뷰 등록 중 오류 발생:', error);
            alert('리뷰 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="MypageRegisterReviewModal-wrap">
            <div className="MypageRegisterReviewModal-container">
                <div className="MypageRegisterReviewModal-header">후기 작성</div>
                <div className="MypageRegisterReviewModal-appointment-no">예약번호: {appointments[0].a_num || ''}</div>
                <div className="MypageRegisterReviewModal-appointment-date">신청일시: {appointments[0].a_date.replace('T', ' ').replace('.000Z', '') || ''}</div>
                <div className="MypageRegisterReviewModal-appointment-rating">
                    <Rating
                        name="vehicle-rating"
                        value={rating} // 별점 값 설정
                        onChange={(event, newValue) => {
                            setRating(newValue); // state에 새 별점 값을 설정
                        }}
                        sx={{
                            color: '#FFB061',
                            '& .MuiRating-icon': {
                                fontSize: '28px', // 별 크기 설정
                            },
                        }}
                    />
                </div>
                <div className="MypageRegisterReviewModal-email-container">
                    <div className="MypageRegisterReviewModal-label">내용  </div>
                    <div className="MypageRegisterReviewModal-input-row">
                        <textarea className="MypageRegisterReviewModal-input-review" value={review} onChange={(event) => { setReview(event.target.value) }}></textarea>
                    </div>
                </div>

                <div className="MypageRegisterReviewModal-modal-footer">
                    <div className="MypageRegisterReviewModal-reserve-button" onClick={handleRegisterReview}>후기저장</div>
                </div>
                <div className="MypageRegisterReviewModal-cancel-reservation" onClick={handleCloseModal}>창 닫기</div>
            </div>
        </div>
    );
};

export default MypageRegisterReviewModal;
