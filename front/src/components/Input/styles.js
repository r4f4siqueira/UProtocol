import styled from "styled-components";
import { ContainerC } from "../../styles/styles";

export const InputContainer = styled(ContainerC)`
    align-items: flex-start;
    margin-top: 1.2rem;

    label {
        margin-bottom: 0.2rem;
    }
    input {
        z-index: 1;
        width: 100%;
        height: 2rem;

        border: none;
        outline: solid 2px #1498d5;
        background-color: #dce8f0;

        border-radius: 0.2rem;

        padding: 0.2rem 0.5rem;

        :hover {
            box-shadow: 0 0 8px #1498d5;
        }

        :focus {
            outline: solid 2px #73c685;
            box-shadow: 0 0 8px #73c685;
        }

        &.correct {
            outline: solid 2px #14d574;
            background-color: #ceeed7;
        }

        &.incorrect {
            outline: solid 2px #d52114;
            background-color: #f0dcdc;
        }
    }
    svg {
        :hover {
            background-color: #d6d6d6;
            border-radius: 2rem;
            cursor: pointer;
            padding: 0.2rem;
            transform: scale(1.32);
        }
        margin-top: -2rem;
    }
    .msg {
        span {
            padding: 0.5rem;
            margin-bottom: 0.5rem;
        }
        position: absolute;
        background-color: #feffac;
        border-radius: 0.5rem;
        border: solid 2px #9c9e24;
        z-index: 2;

        margin-top: -11rem;
        padding: 0.5rem 0.5rem 0.5rem 0.5rem;

        display: flex;
        flex-direction: column;

        ::after {
            align-self: flex-end;
            content: "";

            width: 0;
            z-index: 2;
            border-style: solid;

            border-color: #9c9e24 transparent;
            border-width: 1rem 0.5rem 0;
            margin-bottom: -1.5rem;
            margin-right: -0.2rem;
        }
    }
`;

export const ContainerMsg = styled(ContainerC)`
    display: flex;
    width: 100%;
    align-items: flex-end;
    min-width: fit-content;
    max-height: fit-content;

    z-index: 1;
    svg {
        margin-right: 0.2rem;
    }
    &.disabled {
        .msg {
            display: none;
        }
        svg {
        }
    }
`;
