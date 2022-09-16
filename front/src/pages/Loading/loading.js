import React from "react";

import { ReactComponent as LoadingGif } from "../../assets/Loading/Gear.svg";

import AsyncImage from "../../components/AsyncImage/AsyncImage";
import { Panel, Titles } from "../../styles/styles";
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
