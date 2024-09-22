import { OPEN_MODAL, CLOSE_MODAL} from '../actions/types';

// Reducer 파일들은
// action폴더에 types.js에 명시된 타입을 액션 값으로 받아와서 상태에 저장

const initialState = {
    isOpen: false,
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, isOpen: true };
        case CLOSE_MODAL:
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export default modalReducer;