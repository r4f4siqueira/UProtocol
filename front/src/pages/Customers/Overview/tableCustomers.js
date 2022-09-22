import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

import { TBEdit, TBRemove } from "../../../styles/styles";
import { CustomerTableWrapper } from "./styles";

import { AuthContext } from "../../../context/auth.tsx";
import { deleteCustomer, setSelectedCustomer } from "../../../store/actions/customer.tsx";

function TableCustomers() {
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const Customers = useSelector((state) => state.Customer);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        if (Customers?.customerList === undefined || Customers?.customerList.length === 0) {
            setLocalList([{ id: "0", fantasia: "Você não tem clientes cadastrados!" }]);
        } else {
            setLocalList(Customers.customerList);
        }
    }, [Customers?.customerList]);

    function handleSelectCustomer(index) {
        // console.log(localList[index]);
        dispatch(setSelectedCustomer(localList[index]));
    }

    function handleRemoveCustomer(index) {
        if (window.confirm("Tem certeza? essa acao nao pode ser revertida")) {
            dispatch(deleteCustomer(localList[index].id, user.uid, localList[index].empresa));
        }
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
                            <tr key={"funcionario: " + Customer.id}>
                                <td>{Customer.id}</td>
                                <td>{Customer.fantasia}</td>
                                <td>{Customer.razao_social}</td>
                                <td>{Customer.cpf_cnpj}</td>
                                <td>{Customer.ativo}</td>
                                <td>{Customer.userc}</td>

                                {Customer.id === "0" ? (
                                    ""
                                ) : (
                                    <td>
                                        <TBEdit
                                            onClick={() => {
                                                handleSelectCustomer(index);
                                            }}
                                        >
                                            <BsPencilFill />
                                        </TBEdit>{" "}
                                        <TBRemove
                                            onClick={() => {
                                                handleRemoveCustomer(index);
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
        </CustomerTableWrapper>
    );
}

export default TableCustomers;
