import styled from "styled-components";
import { BtSubmit, ContainerC, GButton, LinkText } from "../../styles/styles";

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

    .loading {
        width: 2.4rem;

        position: absolute;
        margin-top: 0.7rem;
        margin-left: 4.5rem;

        fill: lightgray;
    }
`;

export const BtLogin = styled(BtSubmit)``;

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
