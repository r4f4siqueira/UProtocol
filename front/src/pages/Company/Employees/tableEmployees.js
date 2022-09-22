import React, { useContext, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

import { TBEdit, TBRemove } from "../../../styles/styles";
import { EmployeeTableWrapper } from "./styles";

import { AuthContext } from "../../../context/auth.tsx";
import { deleteEmployee, setSelectedEmployee } from "../../../store/actions/employee.tsx";

function TableEmployees() {
    const dispatch = useDispatch();

    const { user } = useContext(AuthContext);
    const Employees = useSelector((state) => state.Employee);

    const [localList, setLocalList] = useState([]);

    useEffect(() => {
        if (Employees?.employeeList === undefined || Employees?.employeeList.length === 0) {
            setLocalList([{ id: "0", nome: "Você não tem funcionarios cadastrados!" }]);
        } else {
            setLocalList(Employees.employeeList);
        }
    }, [Employees?.employeeList]);

    function handleSelectEmployee(index) {
        // console.log(localList[index]);
        dispatch(setSelectedEmployee(localList[index]));
    }

    function handleRemoveEmployee(index) {
        if (window.confirm("Tem certeza? essa acao nao pode ser revertida")) {
            dispatch(deleteEmployee(localList[index].id, user.uid, localList[index].empresa));
        }
    }

    return (
        <EmployeeTableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Setor</th>
                        <th>Cargo</th>
                        <th>ID Criador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {localList.map((Employee, index) => {
                        return (
                            <tr key={"funcionario: " + Employee.id}>
                                <td>{Employee.id}</td>
                                <td>{Employee.nome}</td>
                                <td>{Employee.email}</td>
                                <td>{Employee.setor}</td>
                                <td>{Employee.cargo}</td>
                                <td>{Employee.userc}</td>

                                {Employee.id === "0" ? (
                                    ""
                                ) : (
                                    <td>
                                        <TBEdit
                                            onClick={() => {
                                                handleSelectEmployee(index);
                                            }}
                                        >
                                            <BsPencilFill />
                                        </TBEdit>{" "}
                                        <TBRemove
                                            onClick={() => {
                                                handleRemoveEmployee(index);
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
        </EmployeeTableWrapper>
    );
}

export default TableEmployees;
