import { OPEN_MODAL, CLOSE_MODAL } from './types';

// 변수에 타입 명시해서 액션값으로 넘겨줌

export const openModal = () => ({
    type: OPEN_MODAL,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});