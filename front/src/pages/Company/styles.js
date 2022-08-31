import styled from "styled-components";
import { ContainerBTW, ContainerR } from "../../styles/styles";
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
