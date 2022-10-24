import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthContext } from '../../../context/auth.tsx';
import { createContact, setSelectedContact, updateContact } from '../../../store/actions/contact.tsx';

import Input from '../../../components/Input/Input';
import Dropbox from '../../../components/Dropbox/dropbox';

import { BtCancel, BtSubmit, Titles } from '../../../styles/styles';
import { ContactFormWrapper, FormContacts as ContactsForm } from './styles';

function FormContacts() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedContact = useSelector((state) => state.Contact.selectedContact);
    const customerList = useSelector((state) => state.Customer.customerList);

    const { user } = useContext(AuthContext);

    const [localSelectedContact, setLocalSelectedContact] = useState();

    const disableSubmit =
        localSelectedContact?.pessoa === '' ||
        localSelectedContact?.pessoa === null ||
        localSelectedContact?.pessoa === undefined ||
        localSelectedContact?.cliente === '' ||
        localSelectedContact?.cliente === null ||
        localSelectedContact?.cliente === undefined ||
        localSelectedContact?.cliente?.value === null;

    // preenchendo a dropbox
    const customerOptions = [];
    customerList.every((customer, index) => {
        if (customer.ativo) {
            customerOptions[index] = { value: customer.id, label: customer.fantasia };
        }
        return true;
    });

    const selectedContactClient = customerList.filter((customer) => customer.id === selectedContact?.cliente)[0]?.fantasia;

    useEffect(() => {
        setLocalSelectedContact({
            ...selectedContact,
            cliente: { value: selectedContact.cliente, label: selectedContactClient },
            ativo: selectedContact.ativo ? '1' : '0',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContact]);

    function handleCancelContact() {
        setLocalSelectedContact({ pessoa: null, email: null, telefone: null, cliente: null, ativo: '1' });
        dispatch(setSelectedContact({ pessoa: null, email: null, telefone: null, cliente: null, ativo: '1' }));
    }

    async function handleContact(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (localSelectedContact?.id) {
            const data = {
                ativo: localSelectedContact.ativo,
                cliente: localSelectedContact.cliente?.value,
                telefone: localSelectedContact.telefone,
                email: localSelectedContact.email,
                pessoa: localSelectedContact.pessoa,
                empresa: companyId,
                uid: user.uid,
                id: localSelectedContact.id,
            };

            await dispatch(updateContact(data));
            handleCancelContact();
        } else {
            // se nao existir ID, criar
            const data = {
                ativo: localSelectedContact.ativo,
                cliente: localSelectedContact.cliente?.value,
                telefone: localSelectedContact.telefone,
                email: localSelectedContact.email,
                pessoa: localSelectedContact.pessoa,
                empresa: companyId,
                uid: user.uid,
            };
            console.log('criar');
            console.log(data);
            await dispatch(createContact(data));
            handleCancelContact();
        }
    }

    // console.log(localSelectedContact);

    return (
        <ContactsForm className={localSelectedContact?.id ? 'edit' : ''}>
            <Titles>{localSelectedContact?.id && `Selecionado: id - ${localSelectedContact?.id} | ${localSelectedContact?.pessoa} `}</Titles>
            <ContactFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleContact(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="input">
                            <Input
                                label="Nome"
                                noMargin={true}
                                placeholder="Nome da pessoa"
                                inputValue={localSelectedContact?.pessoa}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedContact({ ...localSelectedContact, pessoa: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="Email"
                                noMargin={true}
                                placeholder="Email para contato"
                                inputValue={localSelectedContact?.email}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedContact({ ...localSelectedContact, email: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="Telefone"
                                noMargin={true}
                                placeholder="Telefone para contato"
                                inputValue={localSelectedContact?.telefone}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedContact({ ...localSelectedContact, telefone: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Dropbox
                                label="Cliente:"
                                options={customerOptions}
                                ocHandler={(value) => {
                                    setLocalSelectedContact({ ...localSelectedContact, cliente: value });
                                }}
                                inputValue={localSelectedContact?.cliente}
                                search={true}
                            />
                        </div>
                        <div>
                            <Titles>
                                <label>Ativo: </label>
                            </Titles>
                            <input
                                className="ativo"
                                type="checkbox"
                                checked={localSelectedContact?.ativo === '1' ? true : false}
                                onChange={(e) => {
                                    setLocalSelectedContact({ ...localSelectedContact, ativo: e.target.checked ? '1' : '0' });
                                }}
                            />
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel
                            type="button"
                            onClick={handleCancelContact}
                        >
                            Cancelar
                        </BtCancel>
                        <BtSubmit
                            disabled={disableSubmit}
                            type="submit"
                        >
                            {localSelectedContact?.id ? 'Editar' : 'Gravar'}
                        </BtSubmit>
                    </div>
                </form>
            </ContactFormWrapper>
        </ContactsForm>
    );
}

export default FormContacts;
