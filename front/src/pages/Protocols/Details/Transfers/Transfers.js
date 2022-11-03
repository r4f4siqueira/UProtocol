//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes
import TableTransfers from './TableTransfers';
import FormTransfers from './FormTransfers';

//Estilos - icones
import { PanelTable } from '../../../../styles/styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { getTransfers } from '../../../../store/actions/protocol.tsx';
import { getSectors } from '../../../../store/actions/sector.tsx';
import { getEmployees } from '../../../../store/actions/employee.tsx';

function Transfers() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocolId = useSelector((state) => state.Protocol.selectedProtocol.id);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadData() {
            await dispatch(getSectors(user.uid, companyId));
            await dispatch(getEmployees(user.uid, companyId));
        }
        loadData();
    }, []);
    return (
        <>
            <FormTransfers />
            <PanelTable>
                <TableTransfers />
            </PanelTable>
        </>
    );
}
export default Transfers;
