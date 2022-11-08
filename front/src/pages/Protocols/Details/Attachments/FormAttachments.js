//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { AttachmentFormWrapper, FormAttachments as AttachmentForm } from './styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { attachmentProtocol } from '../../../../store/actions/protocol.tsx';
import Dropbox from '../../../../components/Dropbox/dropbox';
import { BtCancel, BtSubmit } from '../../../../styles/styles';

function FormAttachments() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const sectorList = useSelector((state) => state.Sector.sectorList);
    const employeeList = useSelector((state) => state.Employee.employeeList);
    const selectedProtocolId = useSelector((state) => state.Protocol.selectedProtocol.id);
    const { user } = useContext(AuthContext);

    const [localAttachment, setLocalAttachment] = useState({ setor: { value: null }, funcionariodestino: { value: null } });

    const disableSubmit = localAttachment?.setor === null || localAttachment?.setor?.value === null;

    function handleCancelAttachment() {
        setLocalAttachment({ setor: { value: null }, funcionariodestino: { value: null } });
    }

    async function handleAttachment(evt) {
        evt.preventDefault();
        // console.log(localAttachment);
        const data = {
            uid: user.uid,
            empresa: companyId,
            protocolo: selectedProtocolId,
        };
        // console.log('enviando para criar: ');
        // console.log(data);
        dispatch(attachmentProtocol(data));
        handleCancelAttachment();
    }
    return (
        <AttachmentForm>
            <AttachmentFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleAttachment(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="center submit">
                            <BtCancel
                                type="button"
                                onClick={handleCancelAttachment}
                            >
                                Cancelar
                            </BtCancel>
                            <BtSubmit
                                disabled={disableSubmit}
                                type="submit"
                            >
                                Criar
                            </BtSubmit>
                        </div>
                    </div>
                </form>
            </AttachmentFormWrapper>
        </AttachmentForm>
    );
}
export default FormAttachments;
