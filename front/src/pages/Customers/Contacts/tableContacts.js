import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';

import { TBEdit, TBRemove } from '../../../styles/styles';
import { ContactTableWrapper } from './styles';

import { AuthContext } from '../../../context/auth.tsx';
import { deleteContact, setSelectedContact } from '../../../store/actions/contact.tsx';

function TableContacts() {
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const Contacts = useSelector((state) => state.Contact);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        if (Contacts?.contactList === undefined || Contacts?.contactList.length === 0) {
            setLocalList([{ id: '0', pessoa: 'Você não tem contatos cadastrados!', userc: { nome: null } }]);
        } else {
            setLocalList(Contacts.contactList);
        }
    }, [Contacts?.contactList]);

    function handleSelectContact(index) {
        dispatch(setSelectedContact(localList[index]));
    }

    function handleRemoveContact(index) {
        if (window.confirm('Tem certeza? essa acao nao pode ser revertida')) {
            dispatch(deleteContact(localList[index].id, user.uid, localList[index].empresa));
        }
    }

    return (
        <ContactTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome (Pessoa)</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Cliente</th>
                        <th>Ativo</th>
                        <th>ID Criador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Contact, index) => {
                        return (
                            <tr key={'funcionario: ' + Contact.id}>
                                <td>{Contact.id}</td>
                                <td>{Contact.pessoa}</td>
                                <td>{Contact.email}</td>
                                <td>{Contact.telefone}</td>
                                <td>{Contact.cliente}</td>
                                <td>{Contact.ativo}</td>
                                <td>{Contact.userc.nome}</td>

                                {Contact.id === '0' ? (
                                    ''
                                ) : (
                                    <td>
                                        <TBEdit
                                            onClick={() => {
                                                handleSelectContact(index);
                                            }}
                                        >
                                            <BsPencilFill />
                                        </TBEdit>{' '}
                                        <TBRemove
                                            onClick={() => {
                                                handleRemoveContact(index);
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
        </ContactTableWrapper>
    );
}

export default TableContacts;
