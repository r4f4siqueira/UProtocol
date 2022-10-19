//react
import React from 'react';

//componentes
import FormProtocols from './FormProtocols';
import TableProtocols from './TableProtocols';
import { PanelTable } from '../../../styles/styles';

function Overview() {
    return (
        <>
            <FormProtocols />
            <PanelTable>
                <TableProtocols />
            </PanelTable>
        </>
    );
}

export default Overview;
