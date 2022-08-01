// import padrao
import { Link } from "react-router-dom";
import styled from "styled-components";

// componentes

// container Column
export const ContainerC = styled.div`
    min-width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

// container Row
export const ContainerR = styled(ContainerC)`
    flex-direction: row;
`;

export const ContainerCenter = styled(ContainerC)`
    height: 100%;
`;

export const GButton = styled.button`
    margin-top: 1rem;
    padding: 0.4rem;
    border-radius: 0.2rem;

    border: solid 2px black;
    background-color: darkgray;

    color: white;
    font-weight: 800;
    font-size: 1rem;
`;

export const LinkText = styled(Link)`
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1rem;
    transition: all 200ms;

    color: #395b9b;
    padding: 0.5rem;
`;
