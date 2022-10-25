//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PageHeader from '../../../components/PageHeader/PageHeader';

//Actions
import { AuthContext } from '../../../context/auth.tsx';
import { getProtocolDetails } from '../../../store/actions/protocol.tsx';
import { getCompany } from '../../../store/actions/company.tsx';

//components
import Tabs from '../../../components/Tabs/Tabs';
import Loading from '../../Loading/Loading';
import Attachments from './Attachments/Attachments';
import Notes from './Notes/Notes';
import Overview from './Overview/Overview';
import Transfers from './Transfers/Transfers';

//styles
import { TbListDetails } from 'react-icons/tb';
import { FaClipboardList, FaList } from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { ImAttachment } from 'react-icons/im';
import { ContainerPage, PanelPage } from '../../../styles/styles';

function Details() {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.Company);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const protocols = useSelector((state) => state.Protocol);
    const { user } = useContext(AuthContext);

    const tabs = [
        { icon: <TbListDetails />, name: 'Detalhes', navto: `/protocols/details/${selectedProtocol.id}/overview`, disabled: !company.hasCompany },
        { icon: <FaList />, name: 'Observações', navto: `/protocols/details/${selectedProtocol.id}/notes`, disabled: !company.hasCompany },
        { icon: <BiTransfer />, name: 'Repasses', navto: `/protocols/details/${selectedProtocol.id}/transfers`, disabled: !company.hasCompany },
        { icon: <ImAttachment />, name: 'Anexos', navto: `/protocols/details/${selectedProtocol.id}/attachments`, disabled: !company.hasCompany },
    ];

    const { tab, idProtocol } = useParams();
    const navTab = `/protocols/details/${selectedProtocol.id}/${tab}`;
    let selectedTab;

    useEffect(() => {
        async function loadData() {
            if (company.hasCompany === null) {
                await dispatch(getCompany(user.uid));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function loadData() {
            if (company.hasCompany) {
                await dispatch(getProtocolDetails(user.uid, company.companyData.id, idProtocol));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company.hasCompany]);

    switch (tab) {
        case 'overview':
            selectedTab = <Overview />;
            break;
        case 'notes':
            selectedTab = <Notes />;
            break;
        case 'transfers':
            selectedTab = <Transfers />;
            break;
        case 'attachments':
            selectedTab = <Attachments />;
            break;
        default:
            break;
    }

    return (
        <ContainerPage>
            <PageHeader title="Detalhes do protocolo">
                <FaClipboardList className="icon" />
            </PageHeader>
            <PanelPage>
                {protocols.isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Tabs
                            Tabs={tabs}
                            active={navTab}
                        />
                        {selectedTab}
                    </>
                )}
            </PanelPage>
        </ContainerPage>
    );
}
export default Details;
