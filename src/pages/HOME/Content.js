import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import truck1 from "./images/cardTruck1.png";
import arrow from "./images/arrow.svg";
import line from "./videos/linebackground.mp4";

function Content() {
  return (
    <>
      <div className="Content_content">
        <ReactPlayer
          style={{ position: "relative" }}
          className="Content_player"
          url={line}
          playing={true} // 자동 재생 on
          muted={true} // 자동 재생 on하려면 mute 해야함
          controls={false} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          loop={true} // 반복 재생
          width="1920px"
          height="1220px"
        />
        <div className="Content_backText">
          <span className="Content_bText_text1">care</span>
          <span className="Content_bText_text2">review</span>
        </div>
        <div className="Content_container">
          <p className="Content_text1">
            회원님,
            <br />
            <span className="Content_bText">이런 케어</span> 어떠세요?
          </p>
          <p className="Content_text2">
            현재 pawfit의 회원님들이
            <br />
            가장 많이 찾는 상품입니다
          </p>
          <Link to={"/service"}>
            <Button className="Content_btn" variant="contained">
              더 많은 차량보기 {">"}
            </Button>
          </Link>
          <div className="Content_card1">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                  }}
                >
                  <div className="Content_card1_tBorder">No.7749</div>
                </Typography>
                <Typography variant="h5" component="div">
                  <b>Big bubble</b>
                </Typography>
                <Typography variant="body2" className="Content_card1_text1">
                  # 중, 대형견 전문 # 경력 10년차
                  <br /># 파우핏 대표 차량
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/service"}>
                  <img
                    src={arrow}
                    alt="화살표"
                    className="Content_card1_arrow"
                  />
                </Link>
                <div className="Content_card1_arrowBorder"></div>
              </CardActions>
              <img
                src={truck1}
                alt="트럭아이콘"
                className="Content_card1_cardTruck"
              />
            </Card>
          </div>
          <p className="Content_reviewText">
            댕빨트럭 이용자들의{" "}
            <span className="Content_reviewText_Bold">생생한 후기</span>
          </p>
          <div className="Content_review1">
            <p className="Content_review_header">qkrwls***</p>
            <p className="Content_review_starRating">★★★★★</p>
            <p className="Content_review_text">
              저희집 마루는 첫 미용 트라우마로 미용을 극도로 무서워하는
              아이였습니다ㅜㅜ 밑져야 본전으로 마스터 차량에 맡겼는데 거짓말처럼
              행동문제가 고쳐졌더라구요... 앞으로도 댕빨트럭만 이용할
              생각입니다! 최고예요!!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;

// <div className="Content_card2">
//     <Card sx={{minWidth: 275}}>
//         <CardContent>
//             <Typography gutterBottom sx={{
//                 color: 'text.secondary',
//                 fontSize: 14
//             }}>
//                 <div className="Content_card1_tBorder">
//                     No.19
//                 </div>
//             </Typography>
//             <Typography variant="h5" component="div">
//                 <b>Perfect Skin</b>
//             </Typography>
//             <Typography variant="body2"
//                         className="Content_card1_text1">
//                 # 수의사 출신 # 약용 샴푸<br/>
//                 # 검진까지 한번에
//             </Typography>
//         </CardContent>
//         <CardActions>
//             <Link to={'/service'}><img
//                 src="/images/MainHome/arrow.svg" alt="화삺표"
//                 className="Content_card1_arrow"/></Link>
//             <div
//                 className="Content_card1_arrowBorder"></div>
//         </CardActions>
//         <img src="/images/MainHome/cardTruck2.png"
//              alt="카드 트럭 이미지"
//              className="Content_card1_cardTruck"/>
//     </Card>
// </div>
// <div className="Content_card3">
//     <Card sx={{minWidth: 275}}>
//         <CardContent>
//             <Typography gutterBottom sx={{
//                 color: 'text.secondary',
//                 fontSize: 14
//             }}>
//                 <div className="Content_card1_tBorder">
//                     No.07
//                 </div>
//             </Typography>
//             <Typography variant="h5" component="div">
//                 <b>Glow pup</b>
//             </Typography>
//             <Typography variant="body2"
//                         className="Content_card1_text1">
//                 # 소형견 전문 # 훈육 미용<br/>
//                 # 최다 후기 차량
//             </Typography>
//         </CardContent>
//         <CardActions>
//             <Link to={'/service'}><img
//                 src="/images/MainHome/arrow.svg" alt="화삺표"
//                 className="Content_card1_arrow"/></Link>
//             <div
//                 className="Content_card1_arrowBorder"></div>
//         </CardActions>
//         <img src="/images/MainHome/cardTruck3.png"
//              alt="카드 트럭 이미지"
//              className="Content_card1_cardTruck"/>
//     </Card>
// </div>
