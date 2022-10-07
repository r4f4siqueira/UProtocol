//react
import React from 'react';

//componentes
import FormPriorities from './FormPrioritys';
import TablePriorities from './TablePrioritys';
import { PanelTable } from '../../../styles/styles';

function Overview() {
    return (
        <>
            <FormPriorities />
            <PanelTable>
                <TablePriorities />
            </PanelTable>
        </>
    );
}

export default Overview;
