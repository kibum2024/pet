import React from "react";
import "./main.scss";
import Banner from "./Banner";
import Content from "./Content";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import ScrollToTopButton from '../SERVICE/ScrollToTopButton';

function MainHome() {
    return (
        <div className="MainHome_mainHome">
            <Header colorTheme="white" />
            <Banner />
            <Content />
            <ScrollToTopButton />
            <Footer />
        </div>
    );
}

export default MainHome;
