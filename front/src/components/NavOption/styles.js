import styled from 'styled-components';

export const OptionWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 95%;
    padding: 0.8rem 0;
    margin-bottom: 0.3rem;
    transition: all 250ms;

    :first-of-type {
        margin-top: 0.5rem;
    }
    :last-of-type {
        margin-bottom: 0rem;
    }

    background-color: ${(props) => (props.disabled ? '#d1d1d1' : '#d9f8ff')};
    border-radius: 0.2rem;
    border: 1px solid ${(props) => (props.disabled ? '#1498d5' : '#1498d5')};

    svg {
        margin: -0.4rem 0;
        margin-right: 0.5rem;
        height: 1.5rem;
        width: auto;
    }
    span {
        transition: all 250ms;
    }
    :hover {
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
        background-color: ${(props) => (props.disabled ? '' : '#1498d5')};
        span {
            color: ${(props) => (props.disabled ? '' : 'white')};
            margin-left: ${(props) => (props.disabled ? '' : '2rem')};
        }
    }
    &.selected {
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
        background-color: ${(props) => (props.disabled ? '#d1d1d1' : '#1498d5')};
        span {
            color: ${(props) => (props.disabled ? '' : 'white')};
            margin-left: ${(props) => (props.disabled ? '' : '2rem')};
        }
    }
`;
