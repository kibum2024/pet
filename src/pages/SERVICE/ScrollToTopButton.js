import React, {useState, useEffect} from 'react';
import './ScrollToTopButton.css';

function ScrollToTopButton() {
    const [isVisible, setIsVisble] = useState(false);

    //스크롤 이벤트 컨트롤러
    const toggleVisibility = () => {
        if(window.pageYOffset > 300) {
            setIsVisble(true);
        } else {
            setIsVisble(false);
        }
    };

    // 상단으로 스크롤 하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return() => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible &&
                <button onClick={scrollToTop} className="scroll-button">
                    ↑
                </button>
            }
        </div>
    );
}

export default ScrollToTopButton;
