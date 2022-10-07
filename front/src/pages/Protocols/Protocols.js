//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

//Componentes
import Tabs from '../../components/Tabs/Tabs';
import PageHeader from '../../components/PageHeader/PageHeader';

//Estilos - icones
import { ContainerPage, PanelPage } from '../../styles/styles';
import { AiOutlineBars } from 'react-icons/ai';
import { BsHourglassSplit } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';

//Acoes
import { AuthContext } from '../../context/auth.tsx';

function Protocols() {
    //setup context e redux
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    //selectors
    const company = useSelector((state) => state.Company);

    const tabs = [
        { icon: <AiOutlineBars />, name: 'Seus protocolos', navto: '/protocols/overview', disabled: !company.hasCompany },
        { icon: <BsHourglassSplit />, name: 'Fila de espera', navto: '/protocols/queue', disabled: !company.hasCompany },
        { icon: <MdDoneAll />, name: 'Concluídos', navto: '/protocols/finished', disabled: !company.hasCompany },
    ];

    return (
        <ContainerPage>
            <PageHeader title="Protocolos">
                <FaClipboardList className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs Tabs={tabs} />
            </PanelPage>
        </ContainerPage>
    );
}

export default Protocols;
