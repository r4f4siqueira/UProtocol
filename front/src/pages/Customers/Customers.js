//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

//Componentes
import Overview from './Overview/Overview';
import Contacts from './Contacts/Contacts';
import Loading from '../Loading/Loading';
import Tabs from '../../components/Tabs/Tabs';
import PageHeader from '../../components/PageHeader/PageHeader';

//Estilos - icones
import { BsFillTelephoneFill, BsPersonFill } from 'react-icons/bs';
import { ContainerPage, PanelPage } from '../../styles/styles';

//Acoes
import { AuthContext } from '../../context/auth.tsx';
import { getCustomers } from '../../store/actions/customer.tsx';
import { getContacts } from '../../store/actions/contact.tsx';
import { getCompany } from '../../store/actions/company.tsx';

function Customers() {
    //setup context e redux
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    //selectors
    const customers = useSelector((state) => state.Customer);
    const company = useSelector((state) => state.Company);

    //setup tabs
    const tabs = [
        { icon: <BsPersonFill />, name: 'Clientes', navto: '/customers/overview', disabled: !company.hasCompany },
        { icon: <BsFillTelephoneFill />, name: 'Contatos', navto: '/customers/contacts', disabled: !company.hasCompany },
    ];

    const { tab } = useParams();
    const navTab = '/customers/' + tab;
    let selectedTab;

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
                await dispatch(getCustomers(user.uid, company.companyData.id));
                await dispatch(getContacts(user.uid, company.companyData.id));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company.companyData]);

    switch (tab) {
        case 'overview':
            //PENDENTE - trocar o formulário e esse modelo para apenas um display, criar uma
            //pagina de cadastro/edição de empresas para lidar com isso.

            selectedTab = <Overview />;
            break;
        case 'contacts':
            selectedTab = <Contacts />;
            break;
        default:
            break;
    }

    return (
        <ContainerPage>
            <PageHeader title="Clientes">
                <BsPersonFill className="icon" />
            </PageHeader>
            <PanelPage>
                {customers.isLoading ? (
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

export default Customers;
