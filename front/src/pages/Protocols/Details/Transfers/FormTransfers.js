//React
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//Componentes

//Estilos - icones
import { TransferFormWrapper, FormTransfers as TransferForm } from './styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { transferProtocol } from '../../../../store/actions/protocol.tsx';
import Dropbox from '../../../../components/Dropbox/dropbox';
import { BtCancel, BtSubmit } from '../../../../styles/styles';

function FormTransfers() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const sectorList = useSelector((state) => state.Sector.sectorList);
    const employeeList = useSelector((state) => state.Employee.employeeList);
    const selectedProtocolId = useSelector((state) => state.Protocol.selectedProtocol.id);
    const { user } = useContext(AuthContext);

    const [localTransfer, setLocalTransfer] = useState({ setor: { value: null }, funcionariodestino: { value: null } });

    const disableSubmit = localTransfer?.setor === null || localTransfer?.setor?.value === null;

    // preenchendo a dropbox
    const sectorOptions = [];
    sectorList.every((sector, index) => {
        if (sector.ativo) {
            sectorOptions[index] = { value: sector.id, label: `${sector.id} - ${sector.nome}` };
        }
        return true;
    });

    // preenchendo a dropbox
    const employeeOptions = [];
    employeeList.every((employee, index) => {
        if (localTransfer.setor?.value === employee.setor) {
            employeeOptions[index] = { value: employee.id, label: `${employee.id} - ${employee.nome}` };
        }
        return true;
    });

    function handleCancelTransfer() {
        setLocalTransfer({ setor: { value: null }, funcionariodestino: { value: null } });
    }

    async function handleTransfer(evt) {
        evt.preventDefault();
        // console.log(localTransfer);
        const data = {
            uid: user.uid,
            empresa: companyId,
            protocolo: selectedProtocolId,
            funcionariodestino: localTransfer.funcionariodestino.value !== null ? localTransfer.funcionariodestino.value : 0,
            setor: localTransfer.setor.value,
        };
        // console.log('enviando para criar: ');
        // console.log(data);
        dispatch(transferProtocol(data));
        handleCancelTransfer();
    }
    return (
        <TransferForm>
            <TransferFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleTransfer(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="input">
                            <Dropbox
                                label="Setor*:"
                                options={sectorOptions}
                                ocHandler={(value) => {
                                    console.log(localTransfer);
                                    setLocalTransfer({ ...localTransfer, setor: value });
                                }}
                                inputValue={localTransfer?.setor}
                                search={true}
                            />
                        </div>
                        <div className="input">
                            <Dropbox
                                label="Funcionário:"
                                options={employeeOptions}
                                ocHandler={(value) => {
                                    setLocalTransfer({ ...localTransfer, funcionariodestino: value });
                                }}
                                inputValue={localTransfer?.funcionariodestino}
                                search={true}
                            />
                        </div>
                        <div className="center submit">
                            <BtCancel
                                type="button"
                                onClick={handleCancelTransfer}
                            >
                                Cancelar
                            </BtCancel>
                            <BtSubmit
                                disabled={disableSubmit}
                                type="submit"
                            >
                                Criar
                            </BtSubmit>
                        </div>
                    </div>
                </form>
            </TransferFormWrapper>
        </TransferForm>
    );
}
export default FormTransfers;
