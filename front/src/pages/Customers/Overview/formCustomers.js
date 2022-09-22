import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../../context/auth.tsx";
import { createCustomer, setSelectedCustomer, updateCustomer } from "../../../store/actions/customer.tsx";

import Input from "../../../components/Input/Input";
import Dropbox from "../../../components/Dropbox/dropbox";

import { BtCancel, BtSubmit, ContainerR, Titles } from "../../../styles/styles";
import { CustomerFormWrapper, FormCustomers as CustomersForm } from "./styles";

function FormCustomers() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedCustomer = useSelector((state) => state.Customer.selectedCustomer);
    const sectorList = useSelector((state) => state.Sector.sectorList);

    const { user } = useContext(AuthContext);

    const [Customers, setCustomers] = useState();
    const [localSelectedCustomer, setLocalSelectedCustomer] = useState();

    const disableSubmit = localSelectedCustomer?.fantasia === undefined || localSelectedCustomer?.fantasia === "" || localSelectedCustomer?.fantasia === null;

    // preenchendo a dropbox de setores
    const sectorOptions = [];
    sectorList.every((sector, index) => {
        if (sector.ativo === "1") {
            sectorOptions[index] = { value: sector.id, label: sector.nome };
        }
        return true;
    });

    useEffect(() => {
        setLocalSelectedCustomer({
            ...selectedCustomer,
        });
    }, [selectedCustomer]);

    function handleCancelCustomer() {
        setLocalSelectedCustomer({ fantasia: null, razao_social: null, cpf_cnpj: null, ativo: "1" });
        dispatch(setSelectedCustomer({ fantasia: null, razao_social: null, cpf_cnpj: null, ativo: "1" }));
    }
    function handleRemoveCustomer(id) {
        if (window.confirm("Tem certeza?") === true) {
            //dispatch(deleteCustomer(id, user.uid, company.id));
        }
    }

    async function handleCustomer(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (localSelectedCustomer?.id) {
            const data = {
                id: localSelectedCustomer.id,
                uid: user.uid,
                empresa: companyId,
                funcionario: localSelectedCustomer.funcionario,
                setor: selectedCustomer.setor === null ? null : localSelectedCustomer.setor.value,
                cargo: localSelectedCustomer.cargo.value ? localSelectedCustomer.cargo.value : localSelectedCustomer.cargo,
            };
            await dispatch(updateCustomer(data));
            handleCancelCustomer();
        } else {
            // se nao existir ID, criar
            const data = {
                uid: user.uid,
                empresa: companyId,
                email: localSelectedCustomer.email,
                cargo: localSelectedCustomer.cargo.value,
            };
            // console.log("criar");
            // console.log(data);
            await dispatch(createCustomer(data));
            handleCancelCustomer();
        }
    }

    console.log(localSelectedCustomer);

    return (
        <CustomersForm className={localSelectedCustomer?.id ? "edit" : ""}>
            <Titles>{localSelectedCustomer?.id && `Selecionado: id - ${localSelectedCustomer?.id} | ${localSelectedCustomer?.nome} `}</Titles>
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
                                inputValue={localSelectedCustomer?.razao_social}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedCustomer({ ...localSelectedCustomer, razao_social: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="CPF/CNPJ"
                                type="number"
                                noMargin={true}
                                placeholder="Não obrigatório"
                                inputValue={localSelectedCustomer?.cpf_cnpj}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedCustomer({ ...localSelectedCustomer, cpf_cnpj: e.target.value });
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
                                checked={localSelectedCustomer?.ativo === "1" ? true : false}
                                onChange={(e) => {
                                    setLocalSelectedCustomer({ ...localSelectedCustomer, ativo: e.target.checked ? "1" : "0" });
                                }}
                            />
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel type="button" onClick={handleCancelCustomer}>
                            Cancelar
                        </BtCancel>
                        <BtSubmit disabled={disableSubmit} type="submit">
                            Criar
                        </BtSubmit>
                    </div>
                </form>
            </CustomerFormWrapper>
        </CustomersForm>
    );
}

export default FormCustomers;
