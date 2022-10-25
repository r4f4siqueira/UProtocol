//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//Estilos - icones

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import {} from '../../../../store/actions/protocol.tsx';
import { NotesWrapper, PanelNotes, StyledQuill } from './styles';

function Notes() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const protocol = useSelector((state) => state.Protocol);
    const { user } = useContext(AuthContext);

    const [localNote, setLocalNote] = useState();

    return (
        <NotesWrapper>
            <PanelNotes>{localNote}</PanelNotes>
            <StyledQuill
                theme="snow"
                value={localNote}
                onChange={setLocalNote}
            />
        </NotesWrapper>
    );
}
export default Notes;
