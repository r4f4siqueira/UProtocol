import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../../context/auth.tsx";
import { createEmployee } from "../../../store/actions/employee.tsx";

import Input from "../../../components/Input/Input";
import Dropbox from "../../../components/Dropbox/dropbox";

import { BtCancel, BtSubmit, ContainerR, Titles } from "../../../styles/styles";
import { EmployeeFormWrapper, FormEmployees as EmployeesForm } from "./styles";

function FormEmployees() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    //const originalEmployees = useSelector((state) => state.Employee);
    const { user } = useContext(AuthContext);

    const [Employees, setEmployees] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const disableSubmit =
        selectedEmployee?.email === undefined ||
        selectedEmployee?.email === "" ||
        !selectedEmployee?.email?.match(emailREX) ||
        selectedEmployee === null ||
        selectedEmployee?.cargo === undefined ||
        selectedEmployee?.cargo === "" ||
        selectedEmployee.cargo === null;

    const cargoOptions = [
        { value: "G", label: "Gerente" },
        { value: "F", label: "Funcionário" },
    ];

    function handleCancelEmployee() {
        setSelectedEmployee({ email: null, cargo: null });
    }
    function handleRemoveEmployee(id) {
        if (window.confirm("Tem certeza?") === true) {
            //dispatch(deleteEmployee(id, user.uid, company.id));
        }
    }

    async function handleEmployee(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (selectedEmployee?.id) {
            // const data = {
            //     id: selectedEmployee?.id,
            //     ativo: selectedEmployee?.ativo ? selectedEmployee?.ativo : "0",
            //     nome: selectedEmployee?.nome,
            //     uid: user.uid,
            //     empresa: company.id,
            // };
            // await dispatch(updateEmployee(data, user.uid));
            handleCancelEmployee();
        } else {
            // se nao existir ID, criar
            const data = {
                uid: user.uid,
                email: selectedEmployee.email,
                empresa: companyId,
                cargo: selectedEmployee.cargo.value,
            };
            // console.log("criar");
            // console.log(data);
            await dispatch(createEmployee(data));
            handleCancelEmployee();
        }
    }

    // console.log(selectedEmployee);

    return (
        <EmployeesForm className={selectedEmployee?.id ? "edit" : ""}>
            <Titles>{selectedEmployee?.id && `Selecionado: id - ${selectedEmployee?.id}`}</Titles>
            <EmployeeFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleEmployee(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="input">
                            <Input
                                label="Email do funcionário"
                                noMargin={true}
                                placeholder="insira o email do funcionário"
                                inputValue={selectedEmployee?.email}
                                isValid={null}
                                ocHandler={(e) => {
                                    setSelectedEmployee({ ...selectedEmployee, email: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Dropbox
                                label="Cargo:"
                                options={cargoOptions}
                                ocHandler={(value) => {
                                    setSelectedEmployee({ ...selectedEmployee, cargo: value });
                                }}
                                inputValue={selectedEmployee?.cargo}
                            />
                        </div>
                        <div className="input">{selectedEmployee?.id && <Dropbox label="Setor:" options="" />}</div>
                    </div>
                    <div className="center submit">
                        <BtCancel type="button" onClick={handleCancelEmployee}>
                            Cancelar
                        </BtCancel>
                        <BtSubmit disabled={disableSubmit} type="submit">
                            Gravar
                        </BtSubmit>
                    </div>
                </form>
            </EmployeeFormWrapper>
        </EmployeesForm>
    );
}

export default FormEmployees;
