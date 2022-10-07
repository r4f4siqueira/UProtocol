import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

import { TBEdit, TBRemove } from '../../styles/styles';
import { PriorityTableWrapper } from './styles';

import { AuthContext } from '../../context/auth.tsx';
import { setSelectedPriority, deletePriority } from '../../store/actions/priority.tsx';

function TablePriorities() {
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const Prioritys = useSelector((state) => state.Priority);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        if (Prioritys?.priorityList === undefined || Prioritys?.priorityList.length === 0) {
            setLocalList([{ id: '0', fantasia: 'Você não tem clientes cadastrados!', userc: { nome: null } }]);
        } else {
            setLocalList(Prioritys.priorityList);
        }
    }, [Prioritys?.priorityList]);

    function handleSelectPriority(index) {
        // console.log(localList[index]);
        dispatch(setSelectedPriority(localList[index]));
    }
    function handleRemovePriority(index) {
        if (window.confirm('Tem certeza? essa acao nao pode ser revertida')) {
            dispatch(deletePriority(localList[index].id, user.uid, localList[index].empresa));
        }
    }

    return (
        <PriorityTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ordem de importância</th>
                        <th>Ativo</th>
                        <th>Criador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Priority, index) => {
                        // console.log(Priority);
                        return (
                            <tr key={'funcionario: ' + Priority.id}>
                                <td>{Priority.id}</td>
                                <td>{Priority.nome}</td>
                                <td>{Priority.ordemimportancia}</td>
                                <td>{Priority.ativo ? 'Sim' : 'Não'}</td>
                                <td>{Priority.userc.nome}</td>
                                {Priority.id === '0' ? (
                                    ''
                                ) : (
                                    <td>
                                        <TBEdit
                                            onClick={() => {
                                                handleSelectPriority(index);
                                            }}
                                        >
                                            <BsPencilFill />
                                        </TBEdit>{' '}
                                        <TBRemove
                                            onClick={() => {
                                                handleRemovePriority(index);
                                            }}
                                        >
                                            <BsTrashFill />
                                        </TBRemove>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </PriorityTableWrapper>
    );
}

export default TablePriorities;
