import React from 'react';

import Footer from '../../components/footer/Footer';
import MypageBanner from './MypageBanner';
import MypageContent from './MypageContent';

function Mypage() {
    return (
        <div className="mypage2">
            <div>
                <MypageBanner/>
            </div>
            <div>
                <MypageContent/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Mypage;