import React from "react";
import { useNavigate } from "react-router";
import { Titles } from "../../styles/styles";
import { TabsWrapper, Tab } from "./styles";
function Tabs(props) {
    const navigate = useNavigate();

    function handleNavigate(navto) {
        // console.log(navto);
        if (navto && typeof navto === "string") {
            navigate(navto);
        }
    }
    return (
        <TabsWrapper>
            {props?.Tabs?.map((tab) => {
                return (
                    <Tab
                        key={tab.name}
                        onClick={() => {
                            handleNavigate(tab.navto);
                        }}
                        className={props?.active === tab.navto ? "active" : ""}
                    >
                        <Titles>
                            {tab.icon}
                            {tab.name}
                        </Titles>
                    </Tab>
                );
            })}
        </TabsWrapper>
    );
}

export default Tabs;
