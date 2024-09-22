import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, Typography, Rating } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/actions/modalActions';
import axios from "axios";
import Header from '../../components/Header/Header';
import Footer from '../../components/footer/Footer.js';
import ScrollToTopButton from './ScrollToTopButton';
import serviceDetailImg1 from './images/serviceDetailImg1.jpg';
import serviceDetailCar from './images/serviceDetailCar.png';
import ServiceModal from './ServiceModal.js';
import ServicePagination from './ServicePagination.js';
import './ServiceDetail.css';


function ServiceDetail() {
    const [value, setValue] = useState(0);
    // const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const location = useLocation();
    console.log(location); 
    const { vehicleData } = location.state || {};  // state로 전달된 vehicleData를 가져옴
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 페이지당 항목 수
    let totalPages = null;
    let currentItems = null;

    totalPages = Math.ceil(reviews.length / itemsPerPage); // 총 페이지수 계산, Math.ceil()은 소수점올림
    const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지에서 마지막 아이템(리뷰)의 인덱스를 계산
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //현재 페이지에서 첫 번째 아이템(리뷰)의 인덱스를 계산
    currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem); //현재 페이지에서 보여줄 아이템(리뷰)만 잘라서 담음

    // 페이징 컴포넌트에서 선택한 페이지번호를 받아서 셋팅
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/serviceReview.json");
                // v_num param 요청하는 로직 추가할 것
                // params: {
                //     v_num: v_num,
                // }
                setReviews(response.data || []);
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenModal = () => {
        dispatch(openModal()); // 모달 열기
        document.body.style.overflow = 'hidden';  // 모달창이 열렸을때 외부화면 스크롤 막기
    };

    const handleCloseModal = () => {
        dispatch(closeModal()); // 모달 닫기
        document.body.style.overflow = 'auto';  // 모달창이 열렸을때 외부화면 스크롤 가능하게
    };

    // 숫자 포맷팅을 위한 NumberFormat 객체 생성
    const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'decimal',
        minimumFractionDigits: 0, // 소수점 이하 자릿수
    });

    return (
        <div className="Service_detail-container">
            <Header colorTheme="black" />
            <div className="ServiceDetail_reservation-container">
                <div className="ServiceDetail_image-placeholder">
                    <img src={serviceDetailImg1} alt="강아지 사진" />
                </div>
                <div className="ServiceDetail_info-container">
                    <div className="ServiceDetail_info-header">
                        <div className="ServiceDetail_info-tag">NO. {vehicleData.v_num}</div>
                        <div className="ServiceDetail_info-title">{vehicleData.v_name}</div>
                        <div className="ServiceDetail_info-description">
                            # 중,대형견전문 #경력10년차<br />#파우핏대표차량
                        </div>
                        <div className="ServiceDetail_info-rating">
                            <div className="ServiceDetail_rating-stars">
                                <Rating
                                    name="read-only"
                                    value={vehicleData.v_rating}
                                    readOnly
                                    sx={{
                                        color: '#FFB061',
                                        '& .MuiRating-icon': {
                                            fontSize: '28px'  // 별 크기 설정
                                        },
                                    }}
                                />
                            </div>
                            <div className="ServiceDetail_rating-count">({vehicleData.review})</div>
                        </div>
                    </div>
                    <div className="ServiceDetail_price-section">
                        <div className="ServiceDetail_price-title">Price</div>
                        <div className="ServiceDetail_price-description">{vehicleData.s_type} / {vehicleData.c_size}형견</div>
                        <div className="ServiceDetail_price-amount">{formatter.format(vehicleData.price)}원</div>
                    </div>
                    <div className="ServiceDetail_reserve-button" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                        <span>예약하기</span>
                    </div>
                </div>
            </div>

            <div className="ServiceDetail_info-tabs-container">
                <Box
                    sx={{
                        width: '100vw',  // 화면 너비 전체로 설정
                        maxWidth: '1920px',  // 최대 너비 1920px로 제한
                        margin: '0 auto',  // 중간으로 정렬
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  // 중앙 정렬
                        justifyContent: 'center'
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#333333',  // 클릭할 때 나타나는 선 색상
                                height: '5px'  // 선의 두께
                            }
                        }}
                        sx={{
                            '& .MuiTab-root': { color: '#999999', fontWeight: '700', fontSize: '22px' },  // 기본 탭 색상
                            '& .Mui-selected': { color: '#333333', borderBottom: '5px solid #333333' }  // 선택된 탭 스타일
                        }}
                    >
                        <Tab label="차량 정보" />
                        <Tab label="이용 후기" />
                        <Tab label="부가 정보" />
                    </Tabs>

                    {/* Content to display based on tab selection */}
                    <Box sx={{ p: 3, width: '100%', maxWidth: '1920px' }}>
                        {value === 0 &&
                            <img
                                src={serviceDetailCar}
                                alt="차량 정보"
                                style={{
                                    width: '100%',  // 부모 요소의 너비에 맞추기
                                    height: 'auto',  // 자동 높이 설정
                                    maxWidth: '1920px',  // 최대 너비 1920px
                                    display: 'block',
                                    objectFit: 'cover'  // 이미지가 잘 맞도록 설정
                                }}
                            />}
                        {value === 1 &&
                            <div>
                                {currentItems.map((review, index) => (
                                    <div key={index} className="ServiceDetail_review-container">
                                        <div className="ServiceDetail_user-info" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="ServiceDetail_rating-stars" style={{ display: 'flex', alignItems: 'center', width: '150px' }}>
                                                <Rating
                                                    name="read-only"
                                                    value={review.r_rating}
                                                    readOnly
                                                    sx={{
                                                        color: '#FFB061',
                                                        '& .MuiRating-icon': {
                                                            fontSize: '28px'  // 별 크기 설정
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div className="ServiceDetail_user-id" style={{ marginLeft: '16px', fontSize: '20px', fontWeight: '400', color: '#333333', width: '150px', textAlign: 'left' }}>
                                                {review.email.slice(0,2)+'*****'}
                                            </div>
                                        </div>
                                        <div className="ServiceDetail_review-text" style={{ fontSize: '18px', textAlign: 'left' }}>
                                            {review.comments}
                                        </div>
                                    </div>
                                ))}
                                <div className='kb-grid-page'
                                    style={{
                                        width: '400px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto'
                                    }}
                                    >
                                    <ServicePagination
                                        currentPageProp={currentPage}
                                        totalPagesProp={totalPages}
                                        pageLimitProp={5}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        }
                        {value === 2 && <Typography>주의사항 및 사용 제품</Typography>}
                    </Box>
                </Box>
            </div>
            <ScrollToTopButton />
            {isModalOpen && (<ServiceModal handleCloseModal={handleCloseModal} />)}
            <Footer />
        </div>

    );
}

export default ServiceDetail;
