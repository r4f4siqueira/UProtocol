//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import parse from 'html-react-parser';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Tooltip from '@mui/joy/Tooltip';
import Avatar from '@mui/joy/Avatar';

//Estilos - icones
import { NoteItemWrapper } from './styles';
import { ContainerC, ContainerR, Titles } from '../../../../styles/styles';
import { FiInfo } from 'react-icons/fi';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import {} from '../../../../store/actions/protocol.tsx';
import moment from 'moment';

function NoteItem({ obs }) {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Protocol.selectedProtocol);
    const protocolList = useSelector((state) => state.Protocol.protocolList);
    const { user } = useContext(AuthContext);

    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Titles>
            <Divider
                inset="none"
                sx={{ ':before': { backgroundColor: '#3161ff' }, ':after': { backgroundColor: '#3161ff' }, marginY: '1rem' }}
            >
                <Tooltip
                    arrow
                    open={showTooltip}
                    color="primary"
                    variant="outlined"
                    size="lg"
                    placement="top"
                    onMouseEnter={() => {
                        setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false);
                    }}
                    title={
                        <ContainerC>
                            {`Observação id: ${obs.id}`}
                            <Divider sx={{ backgroundColor: '#627fdd', marginY: '5px', textAlign: 'justify' }} />
                            <ContainerR>
                                <Avatar
                                    alt="Avatar do atendente"
                                    src={obs.atendente.avatar}
                                    size="lg"
                                    sx={{ marginRight: '1rem' }}
                                    variant="outlined"
                                    color="primary"
                                />
                                {`Atendente: ${obs.atendente.id} - ${obs.atendente.nome}`}
                            </ContainerR>
                            <Divider sx={{ backgroundColor: '#627fdd', marginY: '5px', textAlign: 'justify' }} />
                            Todos os horários são mostrados em GMT -5
                        </ContainerC>
                    }
                >
                    <Chip
                        variant="soft"
                        color="primary"
                        sx={{ border: '1px solid #3161ff', minWidth: 'fit-content' }}
                    >
                        {moment(obs.created_at).format('DD/MM/YYYY - HH:mm')}
                        <Divider
                            orientation="vertical"
                            sx={{ backgroundColor: '#3161ff', marginX: '10px' }}
                        />
                        <Avatar
                            alt="Avatar do atendente"
                            src={obs.atendente.avatar}
                            size="sm"
                            sx={{ marginRight: '1rem' }}
                        />
                        <FiInfo />
                    </Chip>
                </Tooltip>
            </Divider>
            <h3></h3>
            <NoteItemWrapper>{parse(obs.observacao)}</NoteItemWrapper>
        </Titles>
    );
}
export default NoteItem;
