import styled from "styled-components";
import { ContainerC, GButton } from "../../styles/styles";

export const FormWrapper = styled(ContainerC)`
    form {
        align-self: center;
        min-width: 60%;
    }
`;

export const AvatarWrapper = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 10rem;
    width: 10rem;
    border-radius: 5rem;

    overflow: hidden;

    input {
        display: none;
    }

    :hover {
        svg {
            fill: white;
            transform: scale(2);
        }
        cursor: pointer;
    }

    svg {
        position: absolute;
        fill: lightgrey;
        transition: all 250ms;
        filter: drop-shadow(1px 0 2px black);
    }
`;

export const AvatarImg = styled.img`
    width: 10rem;
`;

export const BtDAccount = styled(GButton)`
    background-color: crimson;
    outline: #a11515 2px solid;
    box-shadow: 0.3rem 0.3rem 1px grey;
    transition: all 200ms;
    :hover {
        background-color: #a11515;
    }
    :active {
        margin-top: 1.4rem;
        margin-bottom: -0.2rem;

        box-shadow: 0.1rem 0.1rem 1px grey;
    }
`;
