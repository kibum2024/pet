import React from 'react';
import Footer from '../../../../components/footer/Footer';
import './confirmRegister.scss'
import logo from '../../logo.svg'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Header from '../../../../components/Header/Header';


function ConfirmRegister(){
    return(
        <div className="ConfirmRegister_main">
            <Header colorTheme="black" />
            <div className="ConfirmRegister_main_container">
                <img src={logo} alt="회원가입 완료 로고"
                     className="ConfirmRegister_logo"/>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;회원이
                    되신 걸 축하합니다!<br/>
                    파우핏에서 맞춤 케어 서비스를 받아보세요
                </p>
                <button type="button" className="ConfirmRegister_btn1">
                    <Link to="/login" className="ConfirmRegister_btn_text1">로그인
                        하기</Link>
                </button>
                <button type="button" className="ConfirmRegister_btn2">
                    <Link to="/" className="ConfirmRegister_btn_text2">메인화면으로</Link>
                </button>
            </div>
            <Footer/>
        </div>
    )
}

export default ConfirmRegister;