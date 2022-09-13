import styled from "styled-components";
import { ContainerBTW, ContainerR, Panel, PanelPage } from "../../styles/styles";
import { FormWrapper } from "./../Profile/styles";

export const CompanyOverview = styled.div`
    width: 100%;
`;

export const CompanyFormWrapper = styled(FormWrapper)`
    form {
        width: 95%;
    }
`;

export const FormButtonsWrapper = styled(ContainerBTW)`
    button {
        width: 10rem;
    }
`;

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

export const ListSectors = styled(Panel)`
    background-color: #dcffef;
    color: #1498d5;
`;

export const SectorTableWrapper = styled.div`
    min-width: 100%;
    overflow-x: auto;
    white-space: nowrap;

    table {
        min-width: 100%;
        border-collapse: collapse;
        font-size: 13pt;
        td,
        th {
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
        }
        thead {
            tr {
                border-bottom: solid 2px #1498d5;

                th {
                    border-right: 1px solid #a5bdb5;
                    padding-left: 0.5rem;
                    min-width: 150px;
                    text-align: start;
                    :first-of-type,
                    :nth-last-child(-n + 3) {
                        padding-left: 0rem;
                        text-align: center;
                        min-width: 50px;
                        width: 75px;
                    }
                }
            }
        }
        tbody {
            tr {
                border-bottom: 1px solid #a5bdb5;
                transition: all 100ms;
                :hover {
                    background-color: #bfe0ff;
                    color: #0072a7;
                }
                :last-of-type {
                    border-bottom: 0px solid #a5bdb5 !important;
                }
            }
            td {
                padding-left: 0.5rem;
                border-right: 1px solid #a5bdb5;
                :first-of-type,
                :nth-last-child(-n + 3) {
                    text-align: center;
                    padding-left: 0rem;
                }
            }
        }
    }
`;

export const Details = styled.span`
    text-align: left;
`;
