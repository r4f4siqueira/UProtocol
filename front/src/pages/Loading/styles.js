import styled from "styled-components";
import { ContainerCenter } from "../../styles/styles";

export const ContainerLoading = styled(ContainerCenter)`
    flex-direction: row;
    .loading {
        width: 10rem;
        fill: #3a85be;
    }
    height: 70vh;
`;
