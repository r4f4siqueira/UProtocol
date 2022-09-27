import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TBConfirm, TBRemove } from '../../styles/styles';
import { InviteTableWrapper } from './styles';

import { AuthContext } from '../../context/auth.tsx';
import { manageInvites } from '../../store/actions/invites.tsx';
import { MdDone } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

function TableInvites() {
	const dispatch = useDispatch();

	const { user } = useContext(AuthContext);
	const Invites = useSelector((state) => state.Invite);

	const [localList, setLocalList] = useState([]);

	useEffect(() => {
		if (Invites?.inviteList === undefined || Invites?.inviteList.length === 0) {
			setLocalList([{ id: '0', nome: 'Você não tem convites pendentes! ' }]);
		} else {
			setLocalList(Invites.inviteList);
		}
	}, [Invites?.inviteList]);

	function handleManageInvite(index, response) {
		console.log();
		dispatch(manageInvites(localList[index].id, user.uid, response));
	}

	return (
		<InviteTableWrapper>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Empresa</th>
						<th>Cargo</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{localList.map((Invite, index) => {
						return (
							<tr key={'funcionario: ' + Invite.id}>
								<td>{Invite.id}</td>
								<td>{Invite.empresa}</td>
								<td>{Invite.cargo}</td>

								{Invite.id === '0' ? (
									''
								) : (
									<td>
										<TBConfirm
											onClick={() => {
												handleManageInvite(index, true);
											}}
										>
											<MdDone />
										</TBConfirm>{' '}
										<TBRemove
											onClick={() => {
												handleManageInvite(index, false);
											}}
										>
											<AiOutlineClose />
										</TBRemove>
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</InviteTableWrapper>
	);
}

export default TableInvites;
