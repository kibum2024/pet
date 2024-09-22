import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import wlogo from "./WhiteHeaderLogo.png";
import blogo from "./BlackHeaderLogo.png";
import "./Header.scss";

function Header({ colorTheme }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 조건에 따라 로고와 클래스 이름을 변경
    const logo = colorTheme === "white" ? wlogo : blogo;
    const logoClass = colorTheme === "white" ? "WHeader" : "BHeader";
    const headerClass =
        colorTheme === "white" ? "WHeader_header" : "BHeader_header";
    const menuClass = colorTheme === "white" ? "WHeader" : "BHeader";
    const buttonClass =
        colorTheme === "white" ? "WHeader_button" : "BHeader_button";
    const loginClass =
        colorTheme === "white" ? "WHeader_login" : "BHeader_login";
    const basicMenuClass =
        colorTheme === "white" ? "WHeader_basic-menu" : "BHeader_basic-menu";

    return (
        <header className={headerClass}>
            <div className={`${menuClass}_menu`}>
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo img"
                        className={`${logoClass}_logo`}
                    />
                </Link>
                <div className={`${menuClass}_item`}>
                    <Link to="/ourstory"><Button id={`${buttonClass}1`}>OUR STORY</Button></Link>
                    <Link to="/service">
                        <Button id={`${buttonClass}2`}>SERVICE</Button>
                    </Link>
                    <Link to="/surport">
                        <Button id={`${buttonClass}3`}>SUPPORT</Button>
                    </Link>
                    <Link to="/login" className={loginClass}>
                        LOG IN
                    </Link>
                    <Button
                        id={`${buttonClass}5`}
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        홍길동 님
                    </Button>
                    <Menu
                        id={basicMenuClass}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose}><Link to="/mypage">회원정보</Link></MenuItem>
                        <MenuItem onClick={handleClose}>이용내역</MenuItem>
                        <MenuItem onClick={handleClose}>로그아웃</MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
