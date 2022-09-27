import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../../context/auth.tsx';
import { createCustomer, setSelectedCustomer, updateCustomer } from '../../../store/actions/customer.tsx';

import Input from '../../../components/Input/Input';

import { BtCancel, BtSubmit, Titles } from '../../../styles/styles';
import { CustomerFormWrapper, FormCustomers as CustomersForm } from './styles';

function FormCustomers() {
	const dispatch = useDispatch();

	const companyId = useSelector((state) => state.Company.companyData?.id);
	const selectedCustomer = useSelector((state) => state.Customer.selectedCustomer);
	const sectorList = useSelector((state) => state.Sector.sectorList);

	const { user } = useContext(AuthContext);

	const [localSelectedCustomer, setLocalSelectedCustomer] = useState();

	const disableSubmit = localSelectedCustomer?.fantasia === undefined || localSelectedCustomer?.fantasia === '' || localSelectedCustomer?.fantasia === null;

	// preenchendo a dropbox de setores
	const sectorOptions = [];
	sectorList.every((sector, index) => {
		if (sector.ativo === '1') {
			sectorOptions[index] = { value: sector.id, label: sector.nome };
		}
		return true;
	});

	useEffect(() => {
		setLocalSelectedCustomer({
			...selectedCustomer,
			ativo: selectedCustomer.ativo ? '1' : '0',
		});
	}, [selectedCustomer]);

	function handleCancelCustomer() {
		setLocalSelectedCustomer({ fantasia: null, razaosocial: null, CNPJ_CPF: null, ativo: '1' });
		dispatch(setSelectedCustomer({ fantasia: null, razaosocial: null, CNPJ_CPF: null, ativo: '1' }));
	}

	async function handleCustomer(evt) {
		evt.preventDefault();

		// se existir ID, editar
		if (localSelectedCustomer?.id) {
			const data = {
				id: localSelectedCustomer.id,
				ativo: localSelectedCustomer.ativo,
				razaosocial: localSelectedCustomer.razaosocial,
				fantasia: localSelectedCustomer.fantasia,
				CNPJ_CPF: localSelectedCustomer.CNPJ_CPF,
				uid: user.uid,
				idEmpresa: companyId,
			};
			await dispatch(updateCustomer(data));
			handleCancelCustomer();
		} else {
			// se nao existir ID, criar
			console.log(localSelectedCustomer);
			const data = {
				ativo: localSelectedCustomer.ativo,
				razaosocial: localSelectedCustomer.razaosocial || null,
				fantasia: localSelectedCustomer.fantasia,
				CNPJ_CPF: localSelectedCustomer.CNPJ_CPF || null,
				uid: user.uid,
				empresa: companyId,
			};
			console.log('criar');
			console.log(data);
			await dispatch(createCustomer(data));
			handleCancelCustomer();
		}
	}

	return (
		<CustomersForm className={localSelectedCustomer?.id ? 'edit' : ''}>
			<Titles>{localSelectedCustomer?.id && `Selecionado: id - ${localSelectedCustomer?.id} | ${localSelectedCustomer?.fantasia} `}</Titles>
			<CustomerFormWrapper>
				<form
					onSubmit={(evt) => {
						handleCustomer(evt);
					}}
				>
					<div className="center inputs">
						<div className="input">
							<Input
								label="Nome fantasia*"
								noMargin={true}
								placeholder="Ou nome da pessoa física"
								inputValue={localSelectedCustomer?.fantasia}
								isValid={null}
								ocHandler={(e) => {
									setLocalSelectedCustomer({ ...localSelectedCustomer, fantasia: e.target.value });
								}}
							/>
						</div>
						<div className="input">
							<Input
								label="Rasão social"
								noMargin={true}
								placeholder="Se for uma empresa"
								inputValue={localSelectedCustomer?.razaosocial}
								isValid={null}
								ocHandler={(e) => {
									setLocalSelectedCustomer({ ...localSelectedCustomer, razaosocial: e.target.value });
								}}
							/>
						</div>
						<div className="input">
							<Input
								label="CPF/CNPJ"
								type="number"
								noMargin={true}
								placeholder="Não obrigatório"
								inputValue={localSelectedCustomer?.CNPJ_CPF}
								isValid={null}
								ocHandler={(e) => {
									setLocalSelectedCustomer({ ...localSelectedCustomer, CNPJ_CPF: e.target.value });
								}}
							/>
						</div>
						<div>
							<Titles>
								<label>Ativo: </label>
							</Titles>
							<input
								className="ativo"
								type="checkbox"
								checked={localSelectedCustomer?.ativo === '1' ? true : false}
								onChange={(e) => {
									setLocalSelectedCustomer({ ...localSelectedCustomer, ativo: e.target.checked ? '1' : '0' });
								}}
							/>
						</div>
					</div>
					<div className="center submit">
						<BtCancel
							type="button"
							onClick={handleCancelCustomer}
						>
							Cancelar
						</BtCancel>
						<BtSubmit
							disabled={disableSubmit}
							type="submit"
						>
							{localSelectedCustomer?.id ? 'Editar' : 'Gravar'}
						</BtSubmit>
					</div>
				</form>
			</CustomerFormWrapper>
		</CustomersForm>
	);
}

export default FormCustomers;
