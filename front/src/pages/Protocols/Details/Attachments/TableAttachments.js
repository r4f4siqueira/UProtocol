//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { AttachmentTableWrapper, TBInfo } from './styles';
import { AiOutlinePaperClip } from 'react-icons/ai';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import {} from '../../../../store/actions/protocol.tsx';
import { TBRemove } from '../../../../styles/styles';
import { BsTrashFill } from 'react-icons/bs';

function TableAttachments() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const attachmentList = useSelector((state) => state.Protocol.selectedAttachments);
    const { user } = useContext(AuthContext);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        // console.log(Protocols);
        if (attachmentList === undefined || attachmentList.length === 0) {
            setLocalList([{ id: '0', setor: 'Esse protocolo não possui repasses' }]);
        } else {
            setLocalList(attachmentList);
        }
    }, [attachmentList]);

    function handleDownloadAttachment(index) {
        //stuff
    }

    function handleRemoveAttachment(index) {
        //stuff
    }

    return (
        <AttachmentTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descricao</th>
                        <th>Criador</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Attachment, index) => {
                        return (
                            <tr key={'repasse: ' + Attachment.id}>
                                <td>{Attachment.id}</td>
                                <td>{Attachment.descricao}</td>
                                <td>{Attachment.userc?.nome}</td>
                                {Attachment.id === '0' ? (
                                    ''
                                ) : (
                                    <td>
                                        <TBInfo
                                            onClick={() => {
                                                handleDownloadAttachment(index);
                                            }}
                                        >
                                            <AiOutlinePaperClip />
                                        </TBInfo>
                                        <TBRemove
                                            onClick={() => {
                                                handleRemoveAttachment(index);
                                            }}
                                        >
                                            <BsTrashFill />
                                        </TBRemove>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </AttachmentTableWrapper>
    );
}
export default TableAttachments;
