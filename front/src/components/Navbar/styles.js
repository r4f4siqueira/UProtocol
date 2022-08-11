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
    justify-content: space-between;

    z-index: 3;

    @media screen and (max-width: 700px) {
        display: none;
    }

    footer {
        justify-self: flex-end;
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
    transition: all 250ms;

    :hover {
        box-shadow: -2px 0 5px black;
        cursor: pointer;
    }
    padding-bottom: 1.5rem;
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

    border-bottom: 1px solid #6a74ff63;
`;

export const LinksWrapper = styled(ContainerC)``;

export const NavFooter = styled.footer`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;

    padding: 0.5rem 1rem;
    width: 100%;

    text-align: center;
    color: crimson;
    border: 1px solid;
    background-color: #fde4e4;

    transition: all 250ms;

    :hover {
        cursor: pointer;
        background-color: #a85656;
        color: #fde4e4;
        border: 1px solid #a85656;
    }

    svg {
        margin-right: 0.2rem;
        margin-bottom: 0rem;
    }
`;
