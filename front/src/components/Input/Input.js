//react
import React, { useState, useEffect } from "react";

//components
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ContainerC, ContainerR, Titles } from "../../styles/styles";

//styles
import { ContainerMsg, InputContainer } from "./styles";

function Input(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    // const [errorMessages, setErrorMessages] = useState([""]);
    const errorMessages = props.errMsg ? [...props.errMsg] : [];

    // useEffect(() => {
    //     const tErr = props.errMsg;
    //     if (tErr.length > 0) {
    //         setErrorMessages(tErr);
    //     }
    // }, [props.errMsg]);

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
        <InputContainer noMargin={props.noMargin ? props.noMargin : false}>
            <Titles>
                <label>{props.label}</label>
            </Titles>
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
                    onBlur={props.blur}
                />
                {props.isValid ? (
                    <ContainerMsg className="disabled">
                        <AiOutlineCheck size="1.5rem" color="#14d574" style={{ backgroundColor: "none" }} />
                    </ContainerMsg>
                ) : props.isValid === false ? (
                    <ContainerMsg className={isEnabled ? "" : "disabled"}>
                        <div className="msg">
                            <span>
                                {errorMessages.map((err, index) => {
                                    return <p key={index}>{err}</p>;
                                })}
                            </span>
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
