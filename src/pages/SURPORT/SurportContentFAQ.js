import { useState } from "react";
import more from "./images/FAQmore.png";
import faqDate from "../../data/faqData.json";
import call from "./images/customer-call.webp";

function FAQListItem({ faq }) {
    const { faq_q, faq_a } = faq;
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq_item">
            <p className="faq_question">
                Q. {faq_q}
                <img src={more} alt="답변" onClick={toggleAnswer} />
            </p>
            {isOpen && (
                <div>
                    <p className="faq_answer">
                        {faq_a.map((answer, i) => (
                            <p key={i}> {answer}</p>
                        ))}
                    </p>
                </div>
            )}
        </div>
    );
}

function FAQList() {
    return (
        <div className="faq">
            <h1>무엇이 궁금하신가요?</h1>
            <div className="customer_call">
                <p>
                    <img src={call} alt="" />
                    <span>고객센터</span>
                    <span> 1588-5757</span>
                </p>
                <p>
                    평일 : 09:30~17:00(12:00~13:00 점심시간)
                    <br />
                    주말, 공휴일 : 미운영
                </p>
            </div>
            <div className="faq_list">
                {faqDate.map((faq) => (
                    <p key={faq.faq_num}>
                        <FAQListItem faq={faq} />
                    </p>
                ))}
            </div>
        </div>
    );
}

export default FAQList;
