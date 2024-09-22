import React from "react";
import MainHome from "./pages/HOME/MainHome";
import Service from "./pages/SERVICE/Service";
import Surport from "./pages/SURPORT/Surport";
import Login from "./pages/MEMBER/login/Login";
import Register from "./pages/MEMBER/register/Register";
import NotFound from "./pages/ERROR/NotFound";
import { Route, Routes } from "react-router-dom";
import ConfirmRegister from "./pages/MEMBER/register/confirmRegister/confirmRegister";
import store from "./state/store";
import { Provider } from "react-redux";
import Mypage from './pages/MYPAGE/Mypage';
import ScrollHistory from './ScrollHistiry';
import ServiceDetail from "./pages/SERVICE/ServiceDetail";
import ServiceList from "./pages/SERVICE/ServiceList";

/*
    TODO 라우터 연결할 컴포넌트들 생성 후 App.js에 작성해주면 연결 완료
 */

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ScrollHistory />
                <Routes>
                    <Route exact path="" element={<MainHome />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/surport" element={<Surport />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/Confirmregister"
                        element={<ConfirmRegister />}
                    />
                    <Route path="/mypage/*" element={<Mypage/>} />
                    <Route path="/serviceDetail" element={<ServiceDetail/>} />
                    <Route path="/serviceList" element={<ServiceList/>} />
                    {/* 아래 Route는 예시 입니다. */}
                    {/*<Route path="/manager" element={<Manager />} />*/}
                    {/*<Route path="/service/:serviceId" element={<Service />} />*/}

                    {/* 위에 일치하는 패스 경로가 없을 경우 오류 페이지 처리 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Provider>
    );
}

export default App;
