import React from "react";
import SurportHeader from "./SurportHeader";
import SurportContent from "./SurportContent";
import Footer from "../../components/footer/Footer";
import "./Surport.scss";

function Surport() {
    return (
        <div id="surport">
            <SurportHeader />
            <SurportContent />
            <Footer />
        </div>
    );
}

export default Surport;
