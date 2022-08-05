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

export const ContainerPage = styled(ContainerC)`
    min-width: 85%;
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

    :disabled {
        filter: saturate(0);
        cursor: not-allowed;
    }
`;

export const Titulos = styled.span`
    max-width: 100%;
    color: #0d99da;
    text-align: center;
    white-space: nowrap;
    padding: 0 0.8rem;

    * {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    h1 {
        font-size: 1.4rem;
    }
    h2 {
        font-size: 1.2rem;
    }
    h3 {
        font-size: 1rem;
    }
    h4 {
        font-size: 0.8rem;
    }
    h5 {
        font-size: 0.7rem;
    }
`;

export const LinkText = styled(Link)`
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1rem;
    transition: all 200ms;

    color: #395b9b;
    padding: 0.5rem;
`;

export const PagesContainer = styled(ContainerR)`
    min-width: 100%;
    min-height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
`;
