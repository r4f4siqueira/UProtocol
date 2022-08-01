//react
import React, { useState, useEffect } from "react";

//components
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ContainerR } from "../../styles/styles";

//styles
import { InputContainer } from "./styles";

function Input(props) {
    const [inputValidation, setInputValidation] = useState();

    useEffect(() => {
        const correct = props.isRight;
        if (correct === true || correct === false) {
            setInputValidation(correct ? "correct" : "incorrect");
        } else {
            setInputValidation(null);
        }
    }, [props.isRight]);

    return (
        <InputContainer>
            <label>{props.label}</label>
            <ContainerR>
                <input type={props.type} className={inputValidation} placeholder={props.placeholder} />
                {inputValidation == "correct" ? (
                    <AiOutlineCheck size="1.5rem" color="#14d574" />
                ) : inputValidation == "incorrect" ? (
                    <AiOutlineClose size="1.5rem" color="#d52114" />
                ) : (
                    ""
                )}
            </ContainerR>
        </InputContainer>
    );
}

export default Input;
