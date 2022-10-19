//React
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions
import { AuthContext } from '../../../context/auth.tsx';
import {} from '../../../store/actions/protocol.tsx';

function FormProtocols() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const protocolList = useSelector((state) => state.Protocol.protocolList);
    const { user } = useContext(AuthContext);

    return (
        <>
            <div>FormProtocols</div>
        </>
    );
}
export default FormProtocols;
