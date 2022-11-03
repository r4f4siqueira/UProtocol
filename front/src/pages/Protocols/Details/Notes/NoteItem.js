//React
import React, { useState } from 'react';
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

function NoteItem({ obs }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const dataCriacao = new Date(obs.created_at).toLocaleDateString('pt-br', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

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
                        {dataCriacao}
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
            <NoteItemWrapper>{parse(obs.observacao)}</NoteItemWrapper>
        </Titles>
    );
}
export default NoteItem;
