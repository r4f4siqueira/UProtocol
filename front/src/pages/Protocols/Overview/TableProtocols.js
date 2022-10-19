//React
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones

//Acoes
import { AuthContext } from '../../../context/auth.tsx';
import {} from '../../../store/actions/protocol.tsx';

function TableProtocols() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const protocolList = useSelector((state) => state.Sector.sectorList);
    const { user } = useContext(AuthContext);

    return (
        <>
            <div>TableProtocols</div>
        </>
    );
}
export default TableProtocols;
