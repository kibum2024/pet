import { combineReducers } from 'redux';
import postcodeReducer from './postcodeReducer'; // 우편번호 검색 관련 리듀서
import modalReducer from './modalReducer';       // 모달창 관련 리듀서

/*
#################################
    모든 리듀서를 결합한 루트 리듀서 파일임
    여기에다 리듀서를 작성하면 어디서든지
    편하게 상태 사용 가능
#################################
 */
const rootReducer = combineReducers({
    postcode: postcodeReducer, // 리듀서를 결합
    modal: modalReducer,
});

export default rootReducer;