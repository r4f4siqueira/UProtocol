//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { TransferTableWrapper } from './styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import {} from '../../../../store/actions/protocol.tsx';

function TableTransfers() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const transferList = useSelector((state) => state.Protocol.selectedTransfers);
    const { user } = useContext(AuthContext);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        // console.log(Protocols);
        if (transferList === undefined || transferList.length === 0) {
            setLocalList([{ id: '0', setor: 'Esse protocolo não possui repasses' }]);
        } else {
            setLocalList(transferList);
        }
    }, [transferList]);

    return (
        <TransferTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Setor</th>
                        <th>Funcionário anterior</th>
                        <th>Funcionário destino</th>
                        <th>Criador</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Transfer) => {
                        return (
                            <tr key={'repasse: ' + Transfer.id}>
                                <td>{Transfer.id}</td>
                                <td>{Transfer.setor}</td>
                                <td>{Transfer.funcionarioatual?.nome}</td>
                                <td>{Transfer.funcionariodestino?.nome}</td>
                                <td>{Transfer.userc?.nome}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TransferTableWrapper>
    );
}
export default TableTransfers;
