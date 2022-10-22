//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { ProtocolTableWrapper, TBInfo } from './styles';
import { FaInfo } from 'react-icons/fa';

//Acoes
import { AuthContext } from '../../../context/auth.tsx';
import { setSelectedProtocol } from '../../../store/actions/protocol.tsx';
import { useNavigate } from 'react-router';

function TableProtocols() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const Protocols = useSelector((state) => state.Protocol);
    const { user } = useContext(AuthContext);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        console.log(Protocols);
        if (Protocols?.protocolList === undefined || Protocols?.protocolList.length === 0) {
            setLocalList([{ id: '0', pessoa: 'Você não tem contatos cadastrados!', userc: { nome: null } }]);
        } else {
            setLocalList(Protocols.protocolList);
        }
    }, [Protocols?.protocolList]);

    function handleSelectProtocol(index) {
        dispatch(setSelectedProtocol(localList[index]));
        navigate('/protocols/details/1');
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
                        return (
                            <tr key={'funcionario: ' + Protocol.id}>
                                <td>{Protocol.prioridade?.nome}</td>
                                <td>{Protocol.id}</td>
                                <td>{Protocol.motivo}</td>
                                <td>{Protocol.cliente?.nome}</td>
                                <td>{Protocol.pessoaatendida}</td>
                                <td>{Protocol.atendente?.nome}</td>
                                <td>{Protocol.previsao}</td>

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
