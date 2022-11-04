import styled from 'styled-components';
import { Panel, TableWrapper, FormWrapper, PanelTable, GBTable } from '../../../../styles/styles';

export const TransferFormWrapper = styled(FormWrapper)`
    form {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;

        .inputs,
        .submit {
            margin-top: 0;
            display: flex;
        }
        .inputs {
            min-width: 50vw;
            align-items: center;
            flex-wrap: wrap;
            @media screen and (max-width: 700px) {
                min-width: 28rem;
            }

            .input {
                min-width: 225px;
                margin-right: 0.5rem;
            }
        }

        .submit {
            @media screen and (max-width: 1300px) {
                button {
                    min-width: 5rem;
                    max-width: 5rem;
                }
            }
            @media screen and (max-width: 800px) {
                button {
                    margin-right: 0rem !important;
                }
            }

            @media screen and (max-width: 700px) {
                flex-direction: column;
                min-width: 100%;
                button {
                    margin-top: 0.4rem;
                    min-width: 100%;
                    :first-of-type {
                        margin-right: 0rem !important;
                    }
                }
            }
            button {
                :first-of-type {
                    margin-right: 1rem;
                }
                width: 10rem;
                max-height: 40px;
                :active {
                    transform: translate(4px, 4px);
                    margin-left: 0;
                }
            }
        }
        @media screen and (max-width: 700px) {
            flex-direction: column;

            .inputs {
                width: 50%;
            }

            .submit {
                align-self: center;
                margin-top: 1rem;
            }
        }
    }
`;

export const FormAttachments = styled(Panel)`
    &.edit {
        background-color: #ffdf89;
    }
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

export const PanelAttachments = styled(PanelTable)``;

export const TransferTableWrapper = styled(TableWrapper)`
    th {
        :nth-of-type(1),
        :nth-of-type(2),
        :nth-last-child(-n + 1) {
            padding-left: 0rem;
            text-align: center;
            min-width: 50px;
            width: 75px;
        }
    }
    td {
        :nth-of-type(1),
        :nth-of-type(2),
        :nth-last-child(-n + 1) {
            text-align: center;
            padding-left: 0rem;
        }
    }
`;

export const TBInfo = styled(GBTable)`
    background-color: #3161ff;
    box-shadow: 0px 3px 0px #002cbe;
`;
