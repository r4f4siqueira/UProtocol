// import padrao
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const ContainerBTW = styled(ContainerC)`
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerCenter = styled(ContainerC)`
    height: 100%;
`;

export const ContainerPage = styled(ContainerC)`
    min-width: 85%;
    height: 100%;
    margin-left: 15rem;
    @media screen and (max-width: 700px) {
        margin: 0;
        width: 100%;
    }
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
    ${(props) => (props.align ? 'text-align: ' + props.align : 'text-align: center;')};
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
    min-height: 53.5rem;
`;

export const PanelTable = styled(Panel)`
    background-color: #dcffef;
    color: #1498d5;
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
        transform: translate(4px, 4px);
        box-shadow: 0.1rem 0.1rem 1px grey;
    }

    :disabled {
        :hover {
            background-color: #73c685;
        }
        :active {
        }
    }
`;

export const GBTable = styled(GButton)`
    margin-top: 0rem;
    transition: all 100ms;
    :active {
        transform: translate(0, 3px);
        box-shadow: 0px 0px 0px #7c7c7c;
    }
    :disabled {
        background-color: #8a8a8a;
        box-shadow: 0px 3px 0px #5e5e5e;
        :active {
            box-shadow: 0px 0px 0px #5e5e5e;
        }
    }
`;

export const TBEdit = styled(GBTable)`
    background-color: #ffc831;
    box-shadow: 0px 3px 0px #be8c00;
`;

export const TBRemove = styled(GBTable)`
    background-color: #dc143c;
    box-shadow: 0px 3px 0px #a70a29;
`;

export const TBConfirm = styled(GBTable)`
    background-color: #14dc67;
    box-shadow: 0px 3px 0px #0a9243;
`;

export const BtCancel = styled(BtSubmit)`
    color: crimson;
    background-color: #fde4e4;
    outline: 1px solid;
    :hover {
        background-color: #a85656;
        outline: 1px solid #a85656;
        color: #fde4e4;
    }
    :disabled {
        :hover {
            background-color: #fde4e4;
            color: crimson;
        }
    }
`;

export const BtsContainer = styled(ContainerR)`
    justify-content: space-evenly;
`;

export const FormWrapper = styled(ContainerC)`
    form {
        align-self: center;
        min-width: 60%;
    }
    .loading {
        width: 2.4rem;

        position: absolute;
        margin-top: 0.7rem;
        margin-left: 4.5rem;

        fill: lightgray;
    }
`;

export const TableWrapper = styled.div`
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
            }
        }
    }
`;
