import styled from "styled-components";
import { ContainerC } from "../../styles/styles";

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
    height: 10rem;
    width: 10rem;
    border-radius: 5rem;
`;
