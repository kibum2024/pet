import React from "react";
import "./Footer.scss";
import logo from "./images/Footerlogo.svg";
import insta from "./images/jt-instagram.svg";
import twitter from "./images/jt-twitter.svg";
import youtube from "./images/jt-youtube.svg";

/*
    TODO 회사소개 태그란을 라우터의 LINK태그로 감싼뒤 OURSTORY 컴포넌트와 연결 시키기
 */

function Footer() {
    return (
        <div className="Footer_footer">
            <div className="Footer_frame1">
                <div className="Footer_frame2">
                    <div className="Footer_frame3">
                        <a href="https://www.instagram.com">
                            <img
                                src={insta}
                                alt="인스타그램 이미지"
                                className="Footer_insta"
                            />
                        </a>
                        <a href="https://www.youtube.com/">
                            <img
                                src={youtube}
                                alt="유튜브 이미지"
                                className="Footer_youtube"
                            />
                        </a>
                        <a href="https://x.com/">
                            <img
                                src={twitter}
                                alt="트위터 이미지"
                                className="Footer_twitter"
                            />
                        </a>
                    </div>
                    <div className="Footer_frame4">
                        <p>회사소개</p>
                        <p> | </p>
                        <p>이용안내</p>
                        <p> | </p>
                        <p>서비스이용약관</p>
                        <p> | </p>
                        <p>개인정보처리방침</p>
                        <p> | </p>
                        <p>공지사항</p>
                    </div>
                    <p className="Footer_address">
                        대표자 김소미 주소 서울시 금천구 가산디지털2로 101
                        <br />
                        TEL : 02-2025-8523 | FAX: 02-2101-2154
                    </p>
                </div>
                <img src={logo} alt="하단 로고 이미지" />
            </div>
        </div>
    );
}

export default Footer;
