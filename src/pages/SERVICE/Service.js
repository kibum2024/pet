import React from 'react';
import ServiceBanner from "./ServiceBanner";
import Footer from '../../components/footer/Footer';
import ServiceRecommend from "./ServiceRecommend";
import ServiceList from "./ServiceList";
import ServiceDetail from "./ServiceDetail"

function Service() {
    return (
        <div className="service2">
            <div>
                <ServiceBanner/>
            </div>
            <div>
                <ServiceRecommend/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Service;