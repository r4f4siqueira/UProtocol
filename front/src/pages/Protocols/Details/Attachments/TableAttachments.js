//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { AttachmentTableWrapper, TBInfo } from './styles';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { FiDownload } from 'react-icons/fi';
import { TBRemove } from '../../../../styles/styles';
import { BsTrashFill } from 'react-icons/bs';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { deleteAttachment } from '../../../../store/actions/protocol.tsx';

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
            setLocalList([{ id: '0', descricao: 'Esse protocolo não possui anexos' }]);
        } else {
            setLocalList(attachmentList);
        }
    }, [attachmentList]);

    function handleDownloadAttachment(url) {
        window.open(url, '_blank');
    }

    function handleRemoveAttachment(index) {
        if (window.confirm('Você tem certeza? essa ação não pode ser desfeita')) {
            dispatch(deleteAttachment(index, user.uid, companyId, selectedProtocol.id));
        }
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
                    {localList.map((Attachment) => {
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
                                                handleDownloadAttachment(Attachment.anexo);
                                            }}
                                        >
                                            <FiDownload />
                                        </TBInfo>
                                        {'  '}
                                        <TBRemove
                                            onClick={() => {
                                                handleRemoveAttachment(Attachment.id);
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
