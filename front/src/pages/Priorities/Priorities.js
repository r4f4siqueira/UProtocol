//React
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

//Componentes
import FormPriorities from './FormPriorities';
import TablePriorities from './TablePriorities';
import { PanelTable } from '../../styles/styles';
import PageHeader from '../../components/PageHeader/PageHeader';

//Estilos - icones
import { ImSortNumbericDesc } from 'react-icons/im';
import { ContainerPage, PanelPage } from '../../styles/styles';

//Acoes
import { AuthContext } from '../../context/auth.tsx';
import { getPriorities } from '../../store/actions/priority.tsx';
import { getCompany } from '../../store/actions/company.tsx';

function Priorities() {
    //setup context e redux
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();

    //selectors
    const priority = useSelector((state) => state.Priority);
    const company = useSelector((state) => state.Company);

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
                await dispatch(getPriorities(user.uid, company.companyData.id));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company.companyData]);

    return (
        <ContainerPage>
            <PageHeader title="Prioridades">
                <ImSortNumbericDesc className="icon" />
            </PageHeader>
            <PanelPage>
                <FormPriorities />
                <PanelTable>
                    <TablePriorities />
                </PanelTable>
            </PanelPage>
        </ContainerPage>
    );
}

export default Priorities;
