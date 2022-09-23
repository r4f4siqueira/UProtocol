import styled from "styled-components";
import { ContainerBTW, FormWrapper } from "../../styles/styles";

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

export const Details = styled.span`
    text-align: left;
`;
