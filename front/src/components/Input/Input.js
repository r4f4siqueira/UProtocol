//react
import React, { useState, useEffect } from "react";

//components
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ContainerC, ContainerR } from "../../styles/styles";

//styles
import { ContainerMsg, InputContainer } from "./styles";

function Input(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    // const [inputValidation, setInputValidation] = useState();

    // useEffect(() => {
    //     const correct = props.isValid;
    //     if (correct === true || correct === false) {
    //         setInputValidation(correct ? "correct" : "incorrect");
    //     } else {
    //         setInputValidation(null);
    //     }
    // }, [props.isValid]);

    // console.log("render");
    // let isEnabled = false;  //transformado em state para poder renderizar o componente novamente

    /**
     * Mostra e esconde a mensagem de erro de acordo com o valor passando em parâmetro
     * @param {boolean} toggleTo true mostra a mensagem, false esconde ela
     */
    function handleToggleMsg(toggleTo) {
        if (typeof toggleTo !== "boolean") {
            return;
        }
        setIsEnabled(toggleTo);
        // console.log(isEnabled);
    }
    // console.log("render");
    return (
        <InputContainer>
            <label>{props.label}</label>
            <ContainerC>
                <input
                    value={props.inputValue || ""}
                    onChange={
                        props.ocHandler ||
                        ((e) => {
                            e.target.value = "";
                        })
                    }
                    type={props.type}
                    className={props.isValid ? "correct" : props.isValid === false ? "incorrect" : ""}
                    placeholder={props.placeholder}
                />
                {props.isValid ? (
                    <ContainerMsg className="disabled">
                        <AiOutlineCheck size="1.5rem" color="#14d574" style={{ backgroundColor: "none" }} />
                    </ContainerMsg>
                ) : props.isValid === false ? (
                    <ContainerMsg className={isEnabled ? "" : "disabled"}>
                        <div className="msg">
                            <span>{props.errMsg}</span>
                        </div>
                        <AiOutlineClose
                            onMouseEnter={() => {
                                handleToggleMsg(true);
                            }}
                            onMouseLeave={() => {
                                handleToggleMsg(false);
                            }}
                            size="1.5rem"
                            color="#d52114"
                        />
                    </ContainerMsg>
                ) : (
                    ""
                )}
            </ContainerC>
        </InputContainer>
    );
}

export default Input;
