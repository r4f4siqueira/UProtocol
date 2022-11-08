//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

//Componentes
import Tabs from '../../components/Tabs/Tabs';
import PageHeader from '../../components/PageHeader/PageHeader';
import Overview from './Overview/Overview';

//Estilos - icones
import { ContainerPage, PanelPage } from '../../styles/styles';
import { AiOutlineBars } from 'react-icons/ai';
import { BsHourglassSplit } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';

//Acoes
import { AuthContext } from '../../context/auth.tsx';
import { getCompany } from '../../store/actions/company.tsx';
import { getProtocols, setSelectedProtocol } from '../../store/actions/protocol.tsx';

function Protocols() {
    //setup context e redux
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    //selectors
    const company = useSelector((state) => state.Company);

    //tabs setup
    const tabs = [
        { icon: <AiOutlineBars />, name: 'Seus protocolos', navto: '/protocols/overview', disabled: !company.hasCompany },
        { icon: <BsHourglassSplit />, name: 'Fila de espera', navto: '/protocols/queue', disabled: !company.hasCompany },
        { icon: <MdDoneAll />, name: 'Concluídos', navto: '/protocols/finished', disabled: !company.hasCompany },
    ];

    const { tab } = useParams();
    const navTab = '/protocols/' + tab;

    useEffect(() => {
        async function loadData() {
            await dispatch(getCompany(user.uid));
        }
        if (company.hasCompany === null) {
            loadData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function loadData() {
            if (company.companyData?.id) {
                // await dispatch(getProtocols(user.uid, company.companyData.id));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company.companyData]);

    switch (tab) {
        case 'overview':
            dispatch(getProtocols(user.uid, company.companyData?.id, 'geral'));
            break;
        case 'queue':
            dispatch(getProtocols(user.uid, company.companyData?.id, 'queue'));
            break;
        case 'finished':
            dispatch(getProtocols(user.uid, company.companyData?.id, 'finished'));
            break;
        default:
            break;
    }
    return (
        <ContainerPage>
            <PageHeader
                title="Protocolos"
                onBack={dispatch(setSelectedProtocol({ cliente: null, motivo: null, pessoaatendida: null }))}
            >
                <FaClipboardList className="icon" />
            </PageHeader>
            <PanelPage>
                <Tabs
                    Tabs={tabs}
                    active={navTab}
                />
                <Overview />
            </PanelPage>
        </ContainerPage>
    );
}

export default Protocols;
