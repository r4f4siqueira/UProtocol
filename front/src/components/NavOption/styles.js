import styled from "styled-components";

export const OptionWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 95%;
    padding: 0.8rem 0;
    margin-bottom: 0.3rem;
    transition: all 250ms;

    :first-of-type {
        margin-top: 0.5rem;
    }
    :last-of-type {
        margin-bottom: 0rem;
    }

    background-color: #d9f8ff;
    border-radius: 0.2rem;
    border: 1px solid #1498d5;

    svg {
        margin: -0.4rem 0;
        margin-right: 0.5rem;
        height: 1.5rem;
        width: auto;
    }
    span {
        transition: all 250ms;
    }
    :hover {
        cursor: pointer;
        background-color: #1498d5;
        span {
            color: white;
            margin-left: 2rem;
        }
    }
    &.selected {
        cursor: pointer;
        background-color: #1498d5;
        span {
            color: white;
            margin-left: 2rem;
        }
    }
`;
