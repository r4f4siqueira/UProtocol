import React from "react";

import { ReactComponent as LoadingGif } from "../../assets/Loading/Gear.svg";

import { Panel } from "../../styles/styles";
import { ContainerLoading } from "./styles";

function Loading() {
    return (
        <Panel>
            <ContainerLoading>
                <LoadingGif className="loading" />
            </ContainerLoading>
        </Panel>
    );
}

export default Loading;
