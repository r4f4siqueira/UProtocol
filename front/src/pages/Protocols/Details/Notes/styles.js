import styled from 'styled-components';
import { ContainerC, Panel } from '../../../../styles/styles';

import ReactQuill from 'react-quill';

export const NotesWrapper = styled(ContainerC)``;

export const StyledQuill = styled(ReactQuill)`
    width: 100%;
    height: 15rem;
    margin-top: 1rem;
`;

export const PanelNotes = styled(Panel)`
    height: 30rem;
    width: 100%;
`;
