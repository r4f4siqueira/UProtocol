import React from "react";
import { Titles } from "../../styles/styles";
import { TabsWrapper, Tab } from "./styles";
function Tabs(props) {
    return (
        <TabsWrapper>
            {props?.Tabs?.map((tab) => {
                return (
                    <Tab key={tab.name} navto="">
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
