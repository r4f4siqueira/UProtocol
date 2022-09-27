import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill } from 'react-icons/bs';

import { TBEdit } from '../../../styles/styles';
import { CustomerTableWrapper } from './styles';

import { setSelectedCustomer } from '../../../store/actions/customer.tsx';

function TableCustomers() {
	const dispatch = useDispatch();

	const Customers = useSelector((state) => state.Customer);

	const [localList, setLocalList] = useState([]);

	useEffect(() => {
		if (Customers?.customerList === undefined || Customers?.customerList.length === 0) {
			setLocalList([{ id: '0', fantasia: 'Você não tem clientes cadastrados!' }]);
		} else {
			setLocalList(Customers.customerList);
		}
	}, [Customers?.customerList]);

	function handleSelectCustomer(index) {
		// console.log(localList[index]);
		dispatch(setSelectedCustomer(localList[index]));
	}

	return (
		<CustomerTableWrapper>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Fantasia</th>
						<th>Rasão social</th>
						<th>CPF/CNPJ</th>
						<th>Ativo</th>
						<th>ID Criador</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{localList.map((Customer, index) => {
						return (
							<tr key={'funcionario: ' + Customer.id}>
								<td>{Customer.id}</td>
								<td>{Customer.fantasia}</td>
								<td>{Customer.razaosocial}</td>
								<td>{Customer.CNPJ_CPF}</td>
								<td>{Customer.ativo}</td>
								<td>{Customer.userc}</td>

								{Customer.id === '0' ? (
									''
								) : (
									<td>
										<TBEdit
											onClick={() => {
												handleSelectCustomer(index);
											}}
										>
											<BsPencilFill />
										</TBEdit>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</CustomerTableWrapper>
	);
}

export default TableCustomers;
