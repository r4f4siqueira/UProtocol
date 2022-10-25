import styled from 'styled-components';
import { ContainerR, GButton, PanelPage } from '../../styles/styles';

export const ContainerPageHeader = styled(ContainerR)``;

export const PanelPageHeader = styled(PanelPage)`
    flex-direction: row;
    align-items: center;
    max-height: fit-content;
    min-height: fit-content;

    margin: 1.5rem 0 1.5rem 0;
    div {
        z-index: 1;
    }
    .icon {
        width: 2rem;
        height: 2rem;
        color: #1498d5;
    }
`;

export const BtBack = styled(GButton)`
    border: none;

    margin: -1rem -1rem;
    padding: 0.8rem 0.4rem;

    border-radius: 0.2rem 0 0 0.2rem;
    background-color: #8acbf3;
    :hover {
        background-color: #64b2df;
    }
    :active {
        background-color: #2e83b4;
    }

    z-index: 2;
`;
