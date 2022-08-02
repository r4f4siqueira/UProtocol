import styled from "styled-components";
import { ContainerC } from "../../styles/styles";

export const InputContainer = styled(ContainerC)`
    align-items: flex-start;
    margin-top: 1.2rem;

    label {
        margin-bottom: 0.2rem;
    }
    input {
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
        margin-left: -1.5rem;
    }
`;
