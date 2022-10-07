import React from 'react';
import FormEmployees from './FormEmployees';
import { PanelEmployees } from './styles';
import TableEmployees from './TableEmployees';

function Employees() {
	return (
		<>
			<FormEmployees />
			<PanelEmployees>
				<TableEmployees />
			</PanelEmployees>
		</>
	);
}

export default Employees;
