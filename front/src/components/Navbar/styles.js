import styled from "styled-components";
import { ContainerC } from "../../styles/styles";

export const NavbarContainer = styled.nav`
    min-width: 250px;
    height: 100vh;
    background-color: #e0f6ff;
    border-right: solid 2px #1498d5;
    box-shadow: 2px 0px 5px #949494ff;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const AvatarWrapper = styled.div`
    border-radius: 4rem;
    overflow: hidden;
    margin: 1.5rem 0 0.5rem 0;
    width: 6rem;
    transition: ease-in 100ms;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const UserWrapper = styled(ContainerC)`
    max-width: 250px;

    :hover {
        box-shadow: -2px 0 5px black;
        cursor: pointer;
    }
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    div {
        :hover {
            box-shadow: 0 0px 5px #0c0c0c;
        }
    }
    span:hover {
        * {
        }
    }
`;
