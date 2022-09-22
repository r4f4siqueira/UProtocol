import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../../context/auth.tsx";
import { createContact, setSelectedContact, updateContact } from "../../../store/actions/contact.tsx";

import Input from "../../../components/Input/Input";
import Dropbox from "../../../components/Dropbox/dropbox";

import { BtCancel, BtSubmit, ContainerR, Titles } from "../../../styles/styles";
import { ContactFormWrapper, FormContacts as ContactsForm } from "./styles";

function FormContacts() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedContact = useSelector((state) => state.Contact.selectedContact);
    const customerList = useSelector((state) => state.Customer.customerList);

    const { user } = useContext(AuthContext);

    const [Contacts, setContacts] = useState();
    const [localSelectedContact, setLocalSelectedContact] = useState();

    const disableSubmit = localSelectedContact?.email === undefined || localSelectedContact?.email === "";

    // preenchendo a dropbox de setores
    const customerOptions = [];
    customerList.every((sector, index) => {
        if (sector.ativo === "1") {
            customerOptions[index] = { value: sector.id, label: sector.nome };
        }
        return true;
    });

    const selectedContactClient = customerList.filter((customer) => customer.id === selectedContact?.customer)[0]?.nome;

    // console.log(selectedContactSetor);

    useEffect(() => {}, []);

    function handleCancelContact() {
        setLocalSelectedContact({ pessoa: null, email: null, telefone: null, cliente: null, ativo: "1" });
        dispatch(setSelectedContact({ pessoa: null, email: null, telefone: null, cliente: null, ativo: "1" }));
    }
    function handleRemoveContact(id) {
        if (window.confirm("Tem certeza?") === true) {
            //dispatch(deleteContact(id, user.uid, company.id));
        }
    }
    console.log(localSelectedContact);

    async function handleContact(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (localSelectedContact?.id) {
            const data = {
                id: localSelectedContact?.id,
                uid: user.uid,
                fantasia: localSelectedContact?.fantasia,
                razao_social: localSelectedContact?.razao_social,
                cpf_cnpj: localSelectedContact?.cpf_cnpj,
                ativo: localSelectedContact?.ativo,
                empresa: companyId,
            };

            // await dispatch(updateContact(data));
            handleCancelContact();
        } else {
            // se nao existir ID, criar
            const data = {
                uid: user.uid,
                fantasia: localSelectedContact?.fantasia,
                razao_social: localSelectedContact?.razao_social,
                cpf_cnpj: localSelectedContact?.cpf_cnpj,
                ativo: localSelectedContact?.ativo,
                empresa: companyId,
            };
            console.log("criar");
            console.log(data);
            // await dispatch(createContact(data));
            // handleCancelContact();
        }
    }

    // console.log(localSelectedContact);

    return (
        <ContactsForm className={localSelectedContact?.id ? "edit" : ""}>
            <Titles>{localSelectedContact?.id && `Selecionado: id - ${localSelectedContact?.id} | ${localSelectedContact?.nome} `}</Titles>
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
                                checked={localSelectedContact?.ativo === "1" ? true : false}
                                onChange={(e) => {
                                    setLocalSelectedContact({ ...localSelectedContact, ativo: e.target.checked ? "1" : "0" });
                                }}
                            />
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel type="button" onClick={handleCancelContact}>
                            Cancelar
                        </BtCancel>
                        <BtSubmit disabled={disableSubmit} type="submit">
                            Convidar
                        </BtSubmit>
                    </div>
                </form>
            </ContactFormWrapper>
        </ContactsForm>
    );
}

export default FormContacts;
