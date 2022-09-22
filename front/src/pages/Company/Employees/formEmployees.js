import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../../context/auth.tsx";
import { createEmployee, setSelectedEmployee, updateEmployee } from "../../../store/actions/employee.tsx";

import Input from "../../../components/Input/Input";
import Dropbox from "../../../components/Dropbox/dropbox";

import { BtCancel, BtSubmit, ContainerR, Titles } from "../../../styles/styles";
import { EmployeeFormWrapper, FormEmployees as EmployeesForm } from "./styles";

function FormEmployees() {
    const dispatch = useDispatch();

    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedEmployee = useSelector((state) => state.Employee.selectedEmployee);
    const sectorList = useSelector((state) => state.Sector.sectorList);

    const { user } = useContext(AuthContext);

    const [Employees, setEmployees] = useState();
    const [localSelectedEmployee, setLocalSelectedEmployee] = useState();
    const emailREX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const disableSubmit =
        localSelectedEmployee?.email === undefined ||
        localSelectedEmployee?.email === "" ||
        !localSelectedEmployee?.email?.match(emailREX) ||
        localSelectedEmployee === null ||
        localSelectedEmployee?.cargo === undefined ||
        localSelectedEmployee?.cargo === "" ||
        localSelectedEmployee.cargo === null;

    const cargoOptions = [
        { value: "G", label: "Gerente" },
        { value: "F", label: "Funcionário" },
    ];

    // preenchendo a dropbox de setores
    const sectorOptions = [];
    sectorList.every((sector, index) => {
        if (sector.ativo === "1") {
            sectorOptions[index] = { value: sector.id, label: sector.nome };
        }
        return true;
    });

    var selectedEmployeeCargo;
    switch (selectedEmployee.cargo) {
        case "A":
            selectedEmployeeCargo = "Administrador";
            break;
        case "G":
            selectedEmployeeCargo = "Gerente";
            break;
        case "F":
            selectedEmployeeCargo = "Funcionário";
            break;
        default:
            break;
    }
    const selectedEmployeeSetor = sectorList.filter((sector) => sector.id === selectedEmployee.setor)[0]?.nome;

    // console.log(selectedEmployeeSetor);

    useEffect(() => {
        setLocalSelectedEmployee({
            ...selectedEmployee,
            cargo: { value: selectedEmployee.cargo, label: selectedEmployeeCargo },
            setor: { value: selectedEmployee.setor, label: selectedEmployeeSetor },
        });
    }, [selectedEmployee]);

    function handleCancelEmployee() {
        setLocalSelectedEmployee({ email: null, cargo: null, setor: null });
        dispatch(setSelectedEmployee({ email: null, cargo: null, setor: null }));
    }
    function handleRemoveEmployee(id) {
        if (window.confirm("Tem certeza?") === true) {
            //dispatch(deleteEmployee(id, user.uid, company.id));
        }
    }

    async function handleEmployee(evt) {
        evt.preventDefault();

        // se existir ID, editar
        if (localSelectedEmployee?.id) {
            const data = {
                uid: user.uid,
                empresa: companyId,
                funcionario: localSelectedEmployee.funcionario,
                setor: selectedEmployee.setor === null ? null : localSelectedEmployee.setor.value,
                cargo: localSelectedEmployee.cargo.value ? localSelectedEmployee.cargo.value : localSelectedEmployee.cargo,
                id: localSelectedEmployee.id,
            };
            await dispatch(updateEmployee(data));
            handleCancelEmployee();
        } else {
            // se nao existir ID, criar
            const data = {
                uid: user.uid,
                email: localSelectedEmployee.email,
                empresa: companyId,
                cargo: localSelectedEmployee.cargo.value,
            };
            // console.log("criar");
            // console.log(data);
            await dispatch(createEmployee(data));
            handleCancelEmployee();
        }
    }

    // console.log(localSelectedEmployee);

    return (
        <EmployeesForm className={localSelectedEmployee?.id ? "edit" : ""}>
            <Titles>{localSelectedEmployee?.id && `Selecionado: id - ${localSelectedEmployee?.id} | ${localSelectedEmployee?.nome} `}</Titles>
            <EmployeeFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleEmployee(evt);
                    }}
                >
                    <div className="center inputs">
                        {!localSelectedEmployee?.id && (
                            <div className="input">
                                <Input
                                    label="Email do funcionário"
                                    noMargin={true}
                                    placeholder="insira o email do funcionário"
                                    inputValue={localSelectedEmployee?.email}
                                    isValid={null}
                                    ocHandler={(e) => {
                                        setLocalSelectedEmployee({ ...localSelectedEmployee, email: e.target.value });
                                    }}
                                />
                            </div>
                        )}
                        <div className="input">
                            <Dropbox
                                label="Cargo:"
                                options={cargoOptions}
                                ocHandler={(value) => {
                                    setLocalSelectedEmployee({ ...localSelectedEmployee, cargo: value });
                                }}
                                inputValue={localSelectedEmployee?.cargo}
                            />
                        </div>
                        <div className="input">
                            {localSelectedEmployee?.id && (
                                <Dropbox
                                    label="Setor:"
                                    options={sectorOptions}
                                    ocHandler={(value) => {
                                        setLocalSelectedEmployee({ ...localSelectedEmployee, setor: value });
                                    }}
                                    inputValue={localSelectedEmployee?.setor}
                                />
                            )}
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel type="button" onClick={handleCancelEmployee}>
                            Cancelar
                        </BtCancel>
                        <BtSubmit disabled={disableSubmit} type="submit">
                            Convidar
                        </BtSubmit>
                    </div>
                </form>
            </EmployeeFormWrapper>
        </EmployeesForm>
    );
}

export default FormEmployees;
