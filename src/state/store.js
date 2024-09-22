import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'; // 개발자 도구를 위한 확장기능
import rootReducer from './reducers/rootReducer'; // 모든 리듀서를 결합한 파일
// 리듀서들을 rootReducer에서 전부 결합해서 여기서는 결합된 리듀서들을 스토어에 저장

const store = createStore(rootReducer );

export default store;