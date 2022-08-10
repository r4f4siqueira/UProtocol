import styled from "styled-components";
import { ContainerC } from "../../styles/styles";

export const NavbarContainer = styled.nav`
    min-width: 250px;
    height: 100vh;
    background-color: #f0f8ff;
    border-right: solid 2px #1498d5;
    box-shadow: 2px 0px 5px #949494ff;

    position: fixed;

    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 3;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

export const AvatarWrapper = styled.div`
    border-radius: 4rem;
    overflow: hidden;
    margin: 1.5rem 0 0.5rem 0;
    width: 6rem;
    height: 6rem;
    transition: ease-in 100ms;

    img {
        width: 6rem;
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
            transform: scale(1.1);
        }
    }
    span:hover {
        * {
        }
    }
`;
