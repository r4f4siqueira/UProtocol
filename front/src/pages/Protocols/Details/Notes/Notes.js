//React
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import {} from '../../../../store/actions/protocol.tsx';

function Notes() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const protocol = useSelector((state) => state.Protocol);
    const { user } = useContext(AuthContext);

    return (
        <>
            <div>Notes</div>
        </>
    );
}
export default Notes;
