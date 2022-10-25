import styled from 'styled-components';
import { ContainerC, Panel } from '../../../../styles/styles';

import ReactQuill from 'react-quill';

export const NotesWrapper = styled(ContainerC)`
    min-height: max-content;
`;

export const StyledQuill = styled(ReactQuill)`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    height: 15rem;
`;

export const PanelNotes = styled(Panel)`
    height: 30rem;
    max-height: 30rem;
    width: 100%;
    padding-bottom: 1rem;
    margin-top: 1rem;

    overflow: auto;
`;

export const NotesForm = styled.form`
    width: 100%;
`;

export const NoteItemWrapper = styled.span`
    text-align: justify;
    white-space: normal;
`;
