import React from 'react';
import { PanelTable } from '../../../styles/styles';
import FormCustomers from './FormCustomers';
import TableCustomers from './TableCustomers';
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
