//react
import React, { useState, useEffect } from "react";

//components
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ContainerC, ContainerR, Titles } from "../../styles/styles";

//styles
import { ContainerMsg, InputContainer } from "./styles";

function PlaceboInput(props) {
    return (
        <InputContainer className={props.isEnabled ? "" : "disabled"}>
            <Titles>
                <label>{props.label}</label>
            </Titles>
            <ContainerC>
                <input readOnly value={props.inputValue || ""} type={props.type} placeholder={props.placeholder} />
            </ContainerC>
        </InputContainer>
    );
}

export default PlaceboInput;
