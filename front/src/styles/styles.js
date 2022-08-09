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
    margin-left: 15rem;
`;

export const GButton = styled.button`
    margin-top: 1rem;
    padding: 0.4rem;
    border-radius: 0.2rem;

    background-color: darkgray;

    color: white;
    font-weight: 800;
    font-size: 1rem;

    :disabled {
        filter: saturate(0);
        cursor: not-allowed;
    }
`;

export const Titles = styled.span`
    max-width: 100%;
    color: #0d99da;
    ${(props) => (props.align ? "text-align: " + props.align : "text-align: center;")};
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
    label {
        margin: 0 -0.8rem;
    }
`;

export const LinkText = styled(Link)`
    margin-top: 1rem;
    font-weight: 700;
    font-size: 1rem;
    transition: all 200ms;

    color: #395b9b;
    padding: 0.5rem;

    :hover {
        color: #153777;
    }
`;

export const PagesContainer = styled(ContainerR)`
    min-width: 100%;
    min-height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const Panel = styled.div`
    display: flex;
    flex-direction: column;

    border-radius: 0.2rem;
    outline: 2px solid #1498d5;
    background-color: #f0f8ff;
`;

export const PanelPage = styled(Panel)`
    width: 95%;
    padding: 1rem;

    box-shadow: 0px 3px 5px #949494ff;
`;

export const BtSubmit = styled(GButton)`
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

export const BtsContainer = styled(ContainerR)`
    justify-content: space-evenly;
`;
