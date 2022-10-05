//react
import React from 'react';

//componentes
import FormCustomers from './FormCustomers';
import TableCustomers from './TableCustomers';
import { PanelTable } from '../../../styles/styles';

function Overview() {
    return (
        <>
            <FormCustomers />
            <PanelTable>
                <TableCustomers />
            </PanelTable>
        </>
    );
}

export default Overview;
