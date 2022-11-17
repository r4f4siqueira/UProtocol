//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import Tooltip from '@mui/joy/Tooltip';
import Chip from '@mui/joy/Chip';

//Estilos - icones
import { ProtocolTableWrapper, TBInfo } from './styles';
import { FaInfo } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

//Acoes
import { AuthContext } from '../../../context/auth.tsx';
import { setSelectedProtocol } from '../../../store/actions/protocol.tsx';
import { useNavigate } from 'react-router';

function TableProtocols() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Protocols = useSelector((state) => state.Protocol);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        // console.log(Protocols);
        if (Protocols?.protocolList === undefined || Protocols?.protocolList.length === 0) {
            setLocalList([{ id: '0', motivo: 'Nenhum protocolo encontrado', previsao: null }]);
        } else {
            setLocalList(Protocols.protocolList);
        }
    }, [Protocols?.protocolList]);

    function handleSelectProtocol(index) {
        console.log('selecionando protocolo: ');
        console.log(localList[index]);
        dispatch(setSelectedProtocol(localList[index])).then(() => {
            navigate(`/protocols/details/${localList[index].id}/overview`);
        });
    }
    //Prioridade | ID | Motivo | Cliente_nome | Pessoa Atendida | Atendente | Previsao
    return (
        <ProtocolTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>Prioridade</th>
                        <th>ID</th>
                        <th>Motivo</th>
                        <th>Cliente</th>
                        <th>Pessoa Atendida</th>
                        <th>Atendente</th>
                        <th>Previsao</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Protocol, index) => {
                        const dataPrevisao =
                            Protocol.previsao !== null
                                ? new Date(Protocol.previsao).toLocaleDateString('pt-br', {
                                      day: 'numeric',
                                      month: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric',
                                      second: 'numeric',
                                      timeZone: 'America/Cuiaba',
                                  })
                                : '';

                        return (
                            <tr
                                className={Protocol.situacao === 'C' ? 'concluido' : Protocol.atrasado === true ? 'atrasado' : ''}
                                key={'funcionario: ' + Protocol.id}
                            >
                                <td>{Protocol.prioridade?.nome}</td>
                                <td>{Protocol.id}</td>
                                <td>{Protocol.motivo}</td>
                                <td>{Protocol.cliente?.nome}</td>
                                <td>{Protocol.pessoaatendida}</td>
                                <td>{Protocol.atendente?.nome}</td>
                                <td>
                                    {dataPrevisao ? (
                                        <Tooltip
                                            arrow
                                            color="danger"
                                            placement="top"
                                            title={Protocol.atrasado === true ? 'Esse protocolo está atrazado!' : ''}
                                            variant="outlined"
                                        >
                                            <Chip
                                                variant="soft"
                                                color={Protocol.atrasado === true ? 'danger' : 'primary'}
                                            >
                                                {dataPrevisao} {Protocol.atrasado === true ? <AiOutlineInfoCircle size={16} /> : ''}
                                            </Chip>
                                        </Tooltip>
                                    ) : (
                                        dataPrevisao
                                    )}
                                </td>

                                {Protocol.id === '0' ? (
                                    ''
                                ) : (
                                    <td>
                                        <TBInfo
                                            onClick={() => {
                                                handleSelectProtocol(index);
                                            }}
                                        >
                                            <FaInfo />
                                        </TBInfo>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </ProtocolTableWrapper>
    );
}
export default TableProtocols;
