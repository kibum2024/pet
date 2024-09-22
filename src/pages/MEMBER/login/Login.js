import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import Header from "../../../components/Header/Header";

function Login() {
    return (
        <div className="Login_main">
            <Header colorTheme="black" />
            <div className="Login_main_form">
                <img
                    src={logo}
                    alt="로그인 로고 이미지"
                    className="Login_logo"
                />
                <p className="Login_text1">로그인</p>
                <form action="#" method="POST">
                    <input
                        type="text"
                        className="Login_email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        className="Login_password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                </form>
                <div className="Login_findAndReg">
                    <span className="Login_findAccount">
                        아이디 찾기 | 비밀번호 찾기
                    </span>
                    <Link to="/register">
                        <span className="Login_register">회원 가입</span>
                    </Link>
                </div>
                <Button className="Login_btn" variant="contained">
                    <span className="Login_btn_text">로그인</span>
                </Button>
                <Link to="/" className="Login_backToMain">
                    메인 화면으로
                </Link>
            </div>
        </div>
    );
}

export default Login;
