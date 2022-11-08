//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import Input from '../../../../components/Input/Input';
import { toast } from 'react-toastify';

//Estilos - icones
import { AttachmentContainer, AttachmentFormWrapper, FileWrapper, FormAttachments as AttachmentForm } from './styles';
import { AiFillFile, AiOutlinePaperClip } from 'react-icons/ai';
import Chip from '@mui/joy/Chip';
import { BtCancel, BtSubmit } from '../../../../styles/styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { createAttachment } from '../../../../store/actions/protocol.tsx';

function FormAttachments() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocolId = useSelector((state) => state.Protocol.selectedProtocol.id);
    const { user } = useContext(AuthContext);

    const [localAttachment, setLocalAttachment] = useState({ descricao: null, anexo: null });

    const disableSubmit = localAttachment?.anexo === null || localAttachment?.descricao === null;

    function handleCancelAttachment() {
        setLocalAttachment({ descricao: null, anexo: null });
    }

    async function handleAttachment(evt) {
        evt.preventDefault();
        if (localAttachment.anexo.size > 128000000) {
            // 128Mb
            toast.error('Arquivo muito grande! Tamanho max permitido: 128Mb', { autoClose: 10000 });
        }
        console.log(localAttachment);
        const data = {
            uid: user.uid,
            empresa: companyId,
            protocolo: selectedProtocolId,
            descricao: localAttachment.descricao,
        };
        const AttachmentFile = localAttachment.anexo;
        console.log('enviando para criar: ');
        console.log(data);
        console.log(AttachmentFile);
        dispatch(createAttachment(data, AttachmentFile));
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
                        <div className="input">
                            <Input
                                label="Descrição do anexo"
                                noMargin={true}
                                placeholder="breve descrição do anexo"
                                inputValue={localAttachment?.descricao}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalAttachment({ ...localAttachment, descricao: e.target.value });
                                }}
                            />
                        </div>
                        <AttachmentContainer>
                            <FileWrapper>
                                <input
                                    onChange={(e) => {
                                        setLocalAttachment({ ...localAttachment, anexo: e.target.files[0] });
                                    }}
                                    type="file"
                                    accept="*"
                                />

                                <AiOutlinePaperClip />
                            </FileWrapper>
                            {localAttachment.anexo?.name ? (
                                <Chip
                                    sx={{ marginRight: '1rem', marginTop: '1rem' }}
                                    variant="soft"
                                    color="warning"
                                    startDecorator={<AiFillFile />}
                                >
                                    Arquivo selecionado: {localAttachment.anexo.name}
                                </Chip>
                            ) : (
                                ''
                            )}
                        </AttachmentContainer>

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
