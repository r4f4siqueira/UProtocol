//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NoteItem from './NoteItem';
import Divider from '@mui/joy/Divider';

//Estilos - icones
import { NotesForm, NotesWrapper, PanelNotes, StyledQuill } from './styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { observeProtocol } from '../../../../store/actions/protocol.tsx';
import { BtCancel, BtSubmit, ContainerR, Titles } from '../../../../styles/styles';

function Notes() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const protocol = useSelector((state) => state.Protocol?.observacoes);
    const { user } = useContext(AuthContext);

    const [localNote, setLocalNote] = useState();

    function handleCancel() {
        setLocalNote('');
    }

    const disableSubmit = localNote === '' || localNote === '<p><br></p>';

    function handleNote(evt) {
        evt.preventDefault();
        console.log(localNote);

        if (localNote === '' || localNote === '<p><br></p>') {
            return;
        }

        dispatch(observeProtocol(user.uid, companyId, selectedProtocol.id, localNote));
    }

    return (
        <NotesWrapper>
            <PanelNotes>
                {selectedProtocol.observacoes?.length > 0 ? (
                    selectedProtocol.observacoes?.map((obs) => {
                        return (
                            <NoteItem
                                key={obs.id}
                                obs={obs}
                            />
                        );
                    })
                ) : (
                    <Titles>
                        <h2>Esse protocolo ainda não tem observações registradas</h2>
                    </Titles>
                )}
            </PanelNotes>
            <NotesForm
                onSubmit={(evt) => {
                    handleNote(evt);
                }}
            >
                <StyledQuill
                    theme="snow"
                    value={localNote}
                    onChange={setLocalNote}
                />
                <ContainerR>
                    <BtCancel
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </BtCancel>
                    {'ㅤㅤ'}
                    <BtSubmit
                        disabled={disableSubmit}
                        type="submit"
                    >
                        Registrar
                    </BtSubmit>
                </ContainerR>
            </NotesForm>
        </NotesWrapper>
    );
}
export default Notes;
