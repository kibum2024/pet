import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import serviceCardTruck1 from './images/serviceCardTruck1.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ServiceBanner from './ServiceBanner';
import ServicePagination from './ServicePagination';
import Footer from '../../components/footer/Footer';
import './ServiceList.css';

function ServiceList() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null);
    const [region, setRegion] = useState('지역'); // 기본값 '지역'
    const [sType, setSType] = useState('검진'); // 기본값 '검진'
    const [cSize, setCSize] = useState('무게'); // 기본값 '무게'
    const [sort, setSort] = useState('정렬'); // 기본값 '정렬'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 페이지당 항목 수

    // useEffect를 사용하여 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/data/serviceVehicle.json");
                setVehicles(response.data || []); // 데이터가 있으면 세팅, 없으면 빈 배열
                setLoading(false); // 데이터 로드 완료 후 로딩 상태 업데이트
            } catch (error) {
                setError("데이터를 불러오는데 실패했습니다.");
                setLoading(false); // 오류 발생 시에도 로딩 상태 업데이트
            }
        };

        fetchData();
    }, []);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 차량 상세 보기 클릭 핸들러
    const serviceDetailClick = (vehicleData) => {
        navigate('/serviceDetail', { state: { vehicleData } });
    };

    // 필터링 로직
    const filteredData = vehicles.filter(vehicle =>
        (region === '지역' || vehicle.region === region) &&
        (cSize === '무게' || vehicle.c_size === cSize) &&
        (sType === '검진' || vehicle.s_type === sType)
    );

    // 정렬 로직
    const sortedData = [...filteredData].sort((a, b) => {
        if (sort === '별점높은순') {
            return b.v_rating - a.v_rating; // 높은 순
        } else if (sort === '별점낮은순') {
            return a.v_rating - b.v_rating; // 낮은 순
        } else if (sort === '리뷰많은순') {
            return b.review - a.review; // 리뷰 많은 순
        } else if (sort === '리뷰적은순') {
            return a.review - b.review; // 리뷰 적은 순
        }
        return 0; // 기본 정렬 없음
    });

    // 페이징 처리
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    // 숫자 포맷팅 (가격 표시용)
    const formatter = new Intl.NumberFormat('ko-KR', {
        style: 'decimal',
        minimumFractionDigits: 0, // 소수점 이하 자릿수
    });

    // 로딩 상태 처리
    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <ServiceBanner />
            <div className="ServiceList_vehicle-list-container">
                <div className="ServiceList_vehicle-title">차량 목록</div>
                <div className="ServiceList_vehicle-filters">
                    {/* 지역 필터 */}
                    <select name="region" className="ServiceList_filter-select" onChange={(event) => setRegion(event.target.value)}>
                        <option value="지역">지역</option>
                        <option value="서울">서울</option>
                        <option value="경기">경기</option>
                        <option value="인천">인천</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도">충청남도</option>
                        <option value="대전">대전</option>
                        <option value="전라북도">전라북도</option>
                        <option value="전라남도">전라남도</option>
                        <option value="광주">광주</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="대구">대구</option>
                        <option value="부산">부산</option>
                        <option value="울산">울산</option>
                        <option value="강원">강원</option>
                        <option value="제주">제주</option>
                    </select>
                    {/* 무게 필터 */}
                    <select name="cSize" className="ServiceList_filter-select" onChange={(event) => setCSize(event.target.value)}>
                        <option value="무게">무게</option>
                        <option value="대">대</option>
                        <option value="중">중</option>
                        <option value="소">소</option>
                    </select>
                    {/* 검진 필터 */}
                    <select name="sType" className="ServiceList_filter-select" onChange={(event) => setSType(event.target.value)}>
                        <option value="검진">검진</option>
                        <option value="일반">일반</option>
                        <option value="수의사">수의사</option>
                        <option value="훈련사">훈련사</option>
                        <option value="마스터">마스터</option>
                    </select>
                    {/* 정렬 필터 */}
                    <select name="sort" className="ServiceList_filter-select" onChange={(event) => setSort(event.target.value)}>
                        <option value="정렬">정렬</option>
                        <option value="별점높은순">별점높은순</option>
                        <option value="별점낮은순">별점낮은순</option>
                        <option value="리뷰많은순">리뷰많은순</option>
                        <option value="리뷰적은순">리뷰적은순</option>
                    </select>
                </div>

                {/* 차량 목록 */}
                <div className="ServiceList_vehicle-items">
                    {currentItems.map((vehicle, index) => (
                        <div key={index} className="ServiceList_vehicle-item">
                            <img className="ServiceList_vehicle-image" src={serviceCardTruck1} alt="트럭 이미지" />
                            <div className="ServiceList_vehicle-details">
                                <div className="ServiceList_vehicle-name">{vehicle.v_name}</div>
                                <div style={{display: 'flex', alignItems: 'center', height: '34px', lineHeight: '34px' }}>
                                    <div className="ServiceList_vehicle-rating">
                                        <Rating
                                            name="read-only"
                                            value={vehicle.v_rating}
                                            readOnly
                                            sx={{
                                                color: '#FFB061',
                                                '& .MuiRating-icon': {
                                                    fontSize: '28px', // 별 크기 설정
                                                },
                                            }}
                                        />

                                    </div>
                                    <div style={{ height: '34px', lineHeight: '34px' }}>({vehicle.review})</div>
                                </div>
                                <div className="ServiceList_vehicle-description">{vehicle.s_type} / {vehicle.c_size}형견 / {vehicle.region}</div>
                                {/* 지역, 리뷰 물어보고 필요없으면 삭제 / {vehicle.region}  / {vehicle.review} */}
                            </div>
                            <div className="ServiceList_vehicle-price">{formatter.format(vehicle.price)} 원</div>
                            <div onClick={() => { serviceDetailClick(vehicle) }}>
                                <span className="ServiceList_view-button">자세히보기</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이징 컴포넌트 */}
                <div className="kb-grid-page" style={{ width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
                    <ServicePagination
                        currentPageProp={currentPage}
                        totalPagesProp={totalPages}
                        pageLimitProp={5}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ServiceList;
