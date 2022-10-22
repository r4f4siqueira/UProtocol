//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropbox from '../../../components/Dropbox/dropbox';
import Input from '../../../components/Input/Input';

//Actions
import { AuthContext } from '../../../context/auth.tsx';
import { updateProtocol, setSelectedProtocol, createProtocol } from '../../../store/actions/protocol.tsx';
import { BtCancel, BtSubmit, Titles } from '../../../styles/styles';

// styles
import { ProtocolFormWrapper, FormProtocols as ProtocolsForm } from './styles';

function FormProtocols() {
    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.Company.companyData?.id);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const customerList = useSelector((state) => state.Customer.customerList);
    const protocolList = useSelector((state) => state.Protocol.protocolList);
    const { user } = useContext(AuthContext);

    const [localSelectedProtocol, setLocalSelectedProtocol] = useState();

    const disableSubmit =
        localSelectedProtocol?.pessoaatendida === undefined ||
        localSelectedProtocol?.pessoaatendida === '' ||
        localSelectedProtocol?.pessoaatendida === null ||
        localSelectedProtocol?.motivo === undefined ||
        localSelectedProtocol?.motivo === '' ||
        localSelectedProtocol?.motivo === null ||
        localSelectedProtocol?.cliente === null ||
        localSelectedProtocol?.cliente?.value === null;
    // preenchendo a dropbox de setores
    const customerOptions = [];
    customerList.every((customer, index) => {
        if (customer.ativo) {
            customerOptions[index] = { value: customer.id, label: `${customer.id} - ${customer.fantasia}` };
        }
        return true;
    });

    function handleCancelProtocol() {
        setLocalSelectedProtocol({});
        dispatch(setSelectedProtocol({ cliente: null, motivo: null, pessoaatendida: null }));
    }
    async function handleProtocol(evt) {
        evt.preventDefault();
        // console.log(localSelectedProtocol);
        const data = {
            uid: user.uid,
            empresa: companyId,
            motivo: localSelectedProtocol.motivo,
            pessoaatendida: localSelectedProtocol.pessoaatendida,
            cliente: localSelectedProtocol.cliente.value,
        };
        console.log('enviando para criar: ');
        console.log(data);
        await dispatch(createProtocol(data));
        handleCancelProtocol();
    }
    return (
        <ProtocolsForm>
            <ProtocolFormWrapper>
                <form
                    onSubmit={(evt) => {
                        handleProtocol(evt);
                    }}
                >
                    <div className="center inputs">
                        <div className="input">
                            <Dropbox
                                label="Cliente:"
                                options={customerOptions}
                                ocHandler={(value) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, cliente: value });
                                }}
                                inputValue={localSelectedProtocol?.cliente}
                                search={true}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="Pessoa atendida*: "
                                noMargin={true}
                                placeholder="Nome da pessoa atendida"
                                inputValue={localSelectedProtocol?.pessoaatendida}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, pessoaatendida: e.target.value });
                                }}
                            />
                        </div>
                        <div className="input">
                            <Input
                                label="Motivo(Descrição)*:"
                                noMargin={true}
                                placeholder="Título do atendimento"
                                inputValue={localSelectedProtocol?.motivo}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, motivo: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                    <div className="center submit">
                        <BtCancel
                            type="button"
                            onClick={handleCancelProtocol}
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
                </form>
            </ProtocolFormWrapper>
        </ProtocolsForm>
    );
}
export default FormProtocols;
