import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../../context/auth.tsx';

import { FormSectors, PanelSectors, SectorFormWrapper } from './styles';
import { BtCancel, BtSubmit, ContainerR, Titles } from '../../../styles/styles';

import Input from '../../../components/Input/Input';
import TableSectors from './TableSectors';
import Loading from '../../Loading/Loading';
import { createSector, deleteSector, updateSector } from '../../../store/actions/sector.tsx';

function Sectors() {
	const dispatch = useDispatch();

	const company = useSelector((state) => state.Company.companyData);
	const originalSectors = useSelector((state) => state.Sector);

	const [sectors, setSectors] = useState();
	const [selectedSector, setSelectedSector] = useState();

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (originalSectors.sectorList.length > 0) {
			setSectors(originalSectors.sectorList);
		}
	}, [originalSectors.sectorList]);

	async function handleSector(evt) {
		evt.preventDefault();

		// se existir ID, editar setor
		if (selectedSector?.id) {
			const data = {
				id: selectedSector?.id,
				ativo: selectedSector?.ativo ? selectedSector?.ativo : '0',
				nome: selectedSector?.nome,
				uid: user.uid,
				empresa: company.id,
			};
			await dispatch(updateSector(data, user.uid));
			handleCancelSector();
		} else {
			// se nao existir ID, criar setor
			const data = {
				ativo: selectedSector?.ativo ? selectedSector?.ativo : '0',
				nome: selectedSector?.nome,
				empresa: company.id,
				uid: user.uid,
			};
			console.log('criar');
			console.log(data);
			await dispatch(createSector(data, user.uid));
			handleCancelSector();
		}
	}

	function handleCancelSector() {
		setSelectedSector(null);
	}
	function handleRemoveSector(id) {
		if (window.confirm('Tem certeza?') === true) {
			dispatch(deleteSector(id, user.uid, company.id));
		}
	}

	const disableSubmit = selectedSector?.nome === undefined || selectedSector?.nome === '' || selectedSector === null;

	if (originalSectors.isLoading) {
		return <Loading />;
	} else {
		return (
			<>
				<FormSectors className={selectedSector?.id ? 'edit' : ''}>
					<SectorFormWrapper>
						<form
							onSubmit={(evt) => {
								handleSector(evt);
							}}
						>
							<div className="center inputs">
								<Input
									label="Nome setor"
									placeholder="Nome do setor"
									inputValue={selectedSector?.nome}
									isValid={null}
									ocHandler={(e) => {
										setSelectedSector({ ...selectedSector, nome: e.target.value });
									}}
								/>
								<ContainerR className="detailsWrapper">
									<Titles>{selectedSector?.id && `Selecionado: id - ${selectedSector?.id}`}</Titles>
									<Titles className="ativoWrapper">
										<label>Ativo:</label>
										<input
											className="ativo"
											type="checkbox"
											checked={selectedSector?.ativo === '1' ? true : false}
											onChange={(e) => {
												setSelectedSector({ ...selectedSector, ativo: e.target.checked ? '1' : '0' });
											}}
										/>
									</Titles>
								</ContainerR>
							</div>
							<div className="center submit">
								<BtCancel
									disabled={disableSubmit}
									type="button"
									onClick={handleCancelSector}
								>
									Cancelar
								</BtCancel>
								<BtSubmit
									disabled={disableSubmit}
									type="submit"
								>
									Gravar
								</BtSubmit>
							</div>
						</form>
					</SectorFormWrapper>
				</FormSectors>
				<PanelSectors>
					<TableSectors
						sectorList={sectors}
						setSector={setSelectedSector}
						handleRemoveSector={handleRemoveSector}
					/>
				</PanelSectors>
			</>
		);
	}
}

export default Sectors;
