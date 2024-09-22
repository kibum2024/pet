import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FAQList from "./SurportContentFAQ";
import "./SurportContent.scss";

function SurportContent() {
    const [value, setValue] = useState(0);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="surport_content">
            <Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#333333", // 클릭할 때 나타나는 선 색상
                            height: "5px", // 선의 두께
                        },
                    }}
                    sx={{
                        "& .MuiTab-root": {
                            color: "#999999",
                            fontWeight: "700",
                            fontSize: "22px",
                        }, // 기본 탭 색상
                        "& .Mui-selected": {
                            color: "#333333",
                            borderBottom: "5px solid #333333",
                        }, // 선택된 탭 스타일
                    }}
                >
                    <Tab label="자주 묻는 질문" />
                    <Tab label="문의 게시판" />
                </Tabs>
            </Box>
            {value === 0 && <FAQList />}
        </div>
    );
}

export default SurportContent;
