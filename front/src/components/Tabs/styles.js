import styled from "styled-components";
import { ContainerR } from "../../styles/styles";
import NavOption from "../NavOption/NavOption";
import { OptionWrapper } from "../NavOption/styles";

export const TabsWrapper = styled(ContainerR)`
    justify-content: flex-start;
    border-bottom: 1px solid #a9c5db;
`;

export const Tab = styled(OptionWrapper)`
    margin: 0rem -1.1rem 0 -1.1rem;

    :first-of-type {
        margin: 0rem 1.5rem 0 0;
    }
    :last-of-type {
        margin-right: 0;
    }
    :hover {
        background-color: #d9f8ff;
        span {
            color: #1498d5;
            margin-left: 0rem;
        }
        box-shadow: 0 3px 0 #1498d5;
    }
    margin-right: 1.5rem;
    border-radius: 0rem;

    border: none;
    background: none;

    width: fit-content;
`;
