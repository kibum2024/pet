import { OPEN_POSTCODE, CLOSE_POSTCODE, SET_ADDRESS } from './types';

export const openPostcode = () => ({
    type: OPEN_POSTCODE,
});

export const closePostcode = () => ({
    type: CLOSE_POSTCODE,
});

export const setAddress = (address, zonecode) => ({
    type: SET_ADDRESS,
    payload: {address, zonecode},
});