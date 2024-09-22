import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openPostcode } from "../../../state/actions/postcodeActions";
import logo from "../logo.svg";
import Header from "../../../components/Header/Header";
import PostcodePopup from "./PostcodePopup";

function Register() {
    const dispatch = useDispatch();
    const { address, zonecode } = useSelector((state) => state.postcode);

    const handleOpenPopup = () => {
        dispatch(openPostcode());
        document.body.style.overflow = 'hidden';
    }

    return (
        <div className="Register_main">
            <Header colorTheme="black" />
            <div className="Register_main_form">
                <img
                    src={logo}
                    alt="회원 가입 로고 이미지"
                    className="Register_logo"
                />
                <span className="Register_mainText">회원가입</span>
                <form
                    action="#"
                    method="POST"
                    className="Register_registerForm"
                >
                    <div className="Register_email">
                        <label htmlFor="email" className="Register_text1">
                            이메일
                        </label>
                        <br />
                        <br />
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="Register_emailInput"
                        />
                        <button className="Register_emailCheck">
                            <span className="Register_checkButton">
                                이메일 인증하기
                            </span>
                        </button>
                    </div>
                    <div className="Register_authentication">
                        <label
                            htmlFor="authentication"
                            className="Register_text2"
                        >
                            인증번호
                        </label>
                        <br />
                        <br />
                        <input
                            type="text"
                            id="authentication"
                            name="authentication"
                            className="Register_authenticationInput"
                        />
                        <button className="Register_autentication_Check">
                            <span className="Register_checkButton">
                                인증 확인
                            </span>
                        </button>
                    </div>
                    <div className="Register_password">
                        <label htmlFor="password" className="Register_text3">
                            비밀번호
                        </label>
                        <br />
                        <br />
                        <input
                            type="text"
                            className="Register_passwordInput"
                            id="password"
                            name="password"
                            placeholder="영문, 숫자, 특수문자 포함하여 8~15자 이내"
                        />
                    </div>
                    <div className="Register_confirmPassword">
                        <label htmlFor="confirmPasswordCheck">
                            비밀번호 확인
                        </label>
                        <br />
                        <br />
                        <input
                            type="text"
                            className="Register_confirmPasswordCheckInput"
                            id="confirmPasswordCheck"
                            name="confirmPasswordCheckCheck"
                        />
                    </div>
                    <div className="Register_name">
                        <label htmlFor="u_name">성명</label>
                        <br />
                        <br />
                        <input
                            type="text"
                            className="Register_nameInput"
                            id="u_name"
                            name="u_name"
                        />
                    </div>
                    <div className="Register_phoneNumber">
                        <label htmlFor="phone">연락처</label>
                        <br />
                        <br />
                        <input
                            type="text"
                            className="Register_phoneNumberInput"
                            id="phone"
                            name="phone"
                        />
                    </div>
                    <div className="Register_addressForm">
                        <label
                            htmlFor="address"
                            className="Register_addressText"
                        >
                            주소
                        </label>
                        <div className="Register_address">
                            <div className="Register_searchForm">
                                <input
                                    type="text"
                                    className="Register_addressInput"
                                    id="zonecode"
                                    name="zonecode"
                                    value={zonecode || ""}
                                />
                                <button
                                    type="button"
                                    className="Register_searchAddress"
                                    onClick={() => (handleOpenPopup())}
                                >
                                    <span className="Register_searchButton">
                                        우편번호 검색
                                    </span>
                                </button>
                            </div>
                            <input
                                type="text"
                                className="Register_addressInput"
                                id="address"
                                name="address"
                                value={address || ""}
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="상세주소를 입력해주세요"
                            />
                        </div>
                    </div>
                    <div className="Register_newsletter">
                        <label
                            className="Register_newsletterText"
                            htmlFor="newsletter"
                        >
                            뉴스레터 알람
                        </label>
                    </div>
                    <input
                        className="Register_newsletterRadio1"
                        type="radio"
                        name="newsletter"
                        id="newsletter"
                        value="Y"
                        checked
                    />
                    <span className="Register_newsletterYes">받기</span>
                    <input
                        className="Register_newsletterRadio2"
                        type="radio"
                        name="newsletter"
                        id="newsletter"
                        value="N"
                    />
                    <span className="Register_newsletterNo">받지 않기</span>
                    <button type="submit" className="Register_button">
                        <span className="Register_button_text">회원가입</span>
                    </button>
                </form>
                <Link to="/login" className="Register_toLogin">
                    로그인 화면으로
                </Link>
            </div>
            <PostcodePopup />
        </div>
    );
}

export default Register;
