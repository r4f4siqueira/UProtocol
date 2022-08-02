import styled from "styled-components";
import { ContainerC, GButton, LinkText } from "../../styles/styles";

export const LoginWrapper = styled(ContainerC)`
    min-width: 40%;

    @media screen and (max-width: 700px) {
        min-width: 70%;
        max-width: 95%;
    }

    font-size: 0.8rem;
    img {
        width: 8.5rem;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        border-bottom: 1px solid lightgray;
        padding-bottom: 1rem;
    }
`;

export const BtLogin = styled(GButton)`
    margin-top: 1.5rem;

    width: 100%;
    border: none;

    outline: 2px solid #1498d5;
    background-color: #73c685;

    box-shadow: 0.3rem 0.3rem 1px grey;
    transition: all 200ms;

    :hover {
        background-color: #3fc45c;
    }

    :active {
        margin-top: 1.7rem;
        margin-bottom: -0.2rem;
        margin-left: 0.3rem;

        box-shadow: 0.1rem 0.1rem 1px grey;
    }

    :disabled {
        :hover {
            background-color: #73c685;
        }
        :active {
            margin: 1.5rem 0 0 0;
            box-shadow: 0.3rem 0.3rem 1px grey;
        }
    }
`;

export const BtGLogin = styled(BtLogin)`
    background-color: #59cee9;
    :hover {
        background-color: #00add4;
    }

    :disabled {
        :hover {
            background-color: #59cee9;
        }
    }
`;

export const LinkPassword = styled(LinkText)`
    color: #dc143c;
    :hover {
        color: #a11330;
    }
`;

export const LinkRegister = styled(LinkText)`
    color: #1493dc;
    :hover {
        color: #1368a1;
    }
`;
