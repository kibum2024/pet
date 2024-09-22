import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
import { closePostcode, setAddress} from '../../../state/actions/postcodeActions';
import './PostcodePopup.scss'


function PostcodePopup() {

    const dispatch = useDispatch();
    const isPostcodeOpen = useSelector((state) => state.postcode.isPostcodeOpen);

    const handleComplete = (data) => {
        const fullAddress = data.address; // 선택된 주소
        const zonecode = data.zonecode;   // 우편번호


        dispatch(setAddress(fullAddress, zonecode));
        dispatch(closePostcode());  // 주소 선택 후 모달 닫기
    };

    const handleClosePopup = () => {
        dispatch(closePostcode());
        document.body.style.overflow = 'auto';   // 모달창 닫히면 스크롤 가능하게
    }

    if (!isPostcodeOpen) {
        return null;
    };




    return (
        <div className="PostcodePopup main" onClick={() => dispatch(closePostcode())}> {/* 모달 외부 클릭시 닫히도록 */}
            <div className="modal-content">  {/* 모달 내부 클릭시 닫히지 않도록 */}
                <button className="close-button"
                        onClick={() => (handleClosePopup())}>×
                </button>
                <DaumPostcode onComplete={handleComplete}/>
            </div>
        </div>
    );
}

export default PostcodePopup;