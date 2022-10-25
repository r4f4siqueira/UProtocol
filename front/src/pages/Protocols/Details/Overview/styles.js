import styled from 'styled-components';
import { ContainerC, ContainerR, Titles } from '../../../../styles/styles';

export const DisplayWrapper = styled(ContainerR)`
    margin-top: 1rem;
    justify-content: space-around;
    flex-wrap: wrap;
`;
export const InputWrapper = styled(ContainerC)`
    min-width: 450px;
    @media screen and (max-width: 700px) {
        min-width: 250px;
    }
`;

export const DropboxWrapper = styled(InputWrapper)`
    min-width: 200px;
`;

export const Cabecalho = styled(Titles)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    font-size: 14pt;
    font-weight: 700;

    span {
        max-width: fit-content;
        border-bottom: 1px solid #a9c5db;
    }
`;

export const DelailsFormWrapper = styled.form`
    margin-top: 1rem;
`;
