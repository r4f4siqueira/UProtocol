//React
import React, { useContext } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/Input/Input';
import PageHeader from '../../../components/PageHeader/PageHeader';

//Actions
import { AuthContext } from '../../../context/auth.tsx';
import {} from '../../../store/actions/protocol.tsx';
import { BtCancel, BtSubmit, ContainerPage, PanelPage } from '../../../styles/styles';

function Details() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedprotocol = useSelector((state) => state.Customer.selectedCustomer);
    const protocolList = useSelector((state) => state.Sector.sectorList);
    const { user } = useContext(AuthContext);

    return (
        <ContainerPage>
            <PageHeader title="Detalhes do protocolo">
                <FaClipboardList className="icon" />
            </PageHeader>
            <PanelPage>
                <form>
                    <Input placeholder={'bomdia'} />
                    <BtCancel>Cancelar</BtCancel>
                    <BtSubmit>Gravar</BtSubmit>
                </form>
            </PanelPage>
        </ContainerPage>
    );
}
export default Details;
