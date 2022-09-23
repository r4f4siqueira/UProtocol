import styled from "styled-components";
import { Panel, TableWrapper, FormWrapper, PanelTable } from "../../../styles/styles";

export const SectorFormWrapper = styled(FormWrapper)`
    form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        div {
            margin-top: 0;
            width: fit-content;
        }
        .center {
            display: flex;
            flex-direction: row;
            align-items: center;
            * {
                margin-top: 0;
                margin-bottom: 0;
            }

            .ativo {
                margin-left: 1rem;
                width: 1rem;
                height: 1rem;
            }
        }
        width: 100%;
        input {
            min-width: fit-content;
        }

        .inputs {
            width: 40%;
            .detailsWrapper {
                min-width: 60%;
                @media screen and (max-width: 1300px) {
                    flex-direction: column;
                }
                @media screen and (max-width: 800px) {
                    margin-left: -0.5rem;
                }
                @media screen and (max-width: 700px) {
                    .ativoWrapper {
                        margin-left: 1.6rem;
                    }
                    min-width: 5rem;
                }
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

export const FormSectors = styled(Panel)`
    &.edit {
        background-color: #ffdf89;
    }
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

export const PanelSectors = styled(PanelTable)``;

export const SectorTableWrapper = styled(TableWrapper)`
    th {
        :first-of-type,
        :nth-last-child(-n + 3) {
            padding-left: 0rem;
            text-align: center;
            min-width: 50px;
            width: 75px;
        }
    }
    td {
        :first-of-type,
        :nth-last-child(-n + 3) {
            text-align: center;
            padding-left: 0rem;
        }
    }
`;
