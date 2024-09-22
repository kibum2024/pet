import React from "react";
import { Link } from "react-router-dom";
// import Button from '@mui/material/Button';
import ReactPlayer from "react-player";
import mainvideo from "./videos/bannerbackground.mp4";

function Banner() {
  return (
    <div className="Banner_banner">
      <ReactPlayer
        style={{ position: "relative" }}
        className="Banner_player"
        url={mainvideo}
        playing={true} // 자동 재생 on
        muted={true} // 자동 재생 on하려면 mute 해야함
        controls={false} // 플레이어 컨트롤 노출 여부
        light={false} // 플레이어 모드
        loop={true} // 반복 재생
        pip={false}
        width="1920px"
        height="1080px"
      />
      <div className="Banner_container">
        <p className="Banner_text1">
          반려견 맞춤 케어 서비스
          <br />
        </p>
        <p className="Banner_text1">PAWFIT</p>
        <p className="Banner_text2">
          파우핏은 반려견의 건강을 고려한 최적의 케어를 선사합니다.
        </p>
        <Link to={"/service"}>
          <button className="Banner_btn">자세히 보기</button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
