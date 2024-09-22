import { OPEN_POSTCODE, CLOSE_POSTCODE, SET_ADDRESS } from '../actions/types';

const initialState = {
    isPostcodeOpen: false,
    address: '',
    zonecode: '',
};

const postcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POSTCODE:
            return {...state, isPostcodeOpen: true};
        case CLOSE_POSTCODE:
            return {...state, isPostcodeOpen: false};
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload.address,
                zonecode: action.payload.zonecode,
                isPostcodeOpen: false,
            };
        default: return state;
    }
};

export default postcodeReducer;