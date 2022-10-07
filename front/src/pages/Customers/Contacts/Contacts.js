import React from 'react';
import { PanelTable } from '../../../styles/styles';
import FormContacts from './FormContacts';
import TableContacts from './TableContacts';
function Contacts() {
	return (
		<>
			<FormContacts />
			<PanelTable>
				<TableContacts />
			</PanelTable>
		</>
	);
}

export default Contacts;
