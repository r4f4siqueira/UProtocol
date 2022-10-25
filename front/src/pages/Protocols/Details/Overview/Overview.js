//React
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Componentes
import Input from '../../../../components/Input/Input';
import Dropbox from '../../../../components/Dropbox/dropbox';
import { ReactComponent as LoadingGif } from '../../../../assets/Loading/Gear.svg';

//Estilos - icones
import { Cabecalho, DelailsFormWrapper, DisplayWrapper, DropboxWrapper, InputWrapper } from './styles';
import { BtCancel, BtSubmit } from '../../../../styles/styles';

//Acoes
import { AuthContext } from '../../../../context/auth.tsx';
import { updateProtocol, getProtocolDetails } from '../../../../store/actions/protocol.tsx';
import { getCustomers } from '../../../../store/actions/customer.tsx';
import { getPriorities } from '../../../../store/actions/priority.tsx';
import { getCompany } from '../../../../store/actions/company.tsx';
import { useParams } from 'react-router';
import moment from 'moment';

function Overview() {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.Company);
    const selectedProtocol = useSelector((state) => state.Protocol.selectedProtocol);
    const { user } = useContext(AuthContext);

    const customerList = useSelector((state) => state.Customer.customerList);
    const priorityList = useSelector((state) => state.Priority.priorityList);

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

    // preenchendo a dropbox com as entidades
    const customerOptions = [];
    customerList.every((customer, index) => {
        if (customer.ativo) {
            customerOptions[index] = { value: customer.id, label: `${customer.id} - ${customer.fantasia}` };
        }
        return true;
    });

    // preenchendo a dropbox com as entidades
    const priorityOptions = [];
    priorityList.every((priority, index) => {
        if (priority.ativo) {
            priorityOptions[index] = { value: priority.id, label: `${priority.ordemimportancia} - ${priority.nome}` };
        }
        return true;
    });
    useEffect(() => {
        async function loadData() {
            if (company.hasCompany) {
                dispatch(getPriorities(user.uid, company.companyData.id));
                dispatch(getCustomers(user.uid, company.companyData.id));
            } else {
                await dispatch(getCompany(user.uid));
                await dispatch(getPriorities(user.uid, company.companyData.id));
                await dispatch(getCustomers(user.uid, company.companyData.id));
            }
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [company.hasCompany]);

    console.log('detalhes do protocolo');
    console.log(selectedProtocol);
    console.log('detalhes do protocolo local');
    console.log(localSelectedProtocol);

    const { idProtocol } = useParams();
    useEffect(() => {
        if (selectedProtocol) {
            setLocalSelectedProtocol({
                ...selectedProtocol,
                cliente: { value: selectedProtocol.cliente?.id, label: selectedProtocol.cliente?.nome },
                prioridade: { value: selectedProtocol.prioridade?.id, label: selectedProtocol.prioridade?.nome },
                previsao: moment(selectedProtocol.previsao).format('yyyy-MM-DDThh:mm'),
            });
        } else {
            dispatch(getProtocolDetails(user.uid, company.companyData.id, idProtocol));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProtocol]);

    function handleCancelProtocol() {
        setLocalSelectedProtocol({
            ...selectedProtocol,
            cliente: { value: selectedProtocol.cliente?.id, label: selectedProtocol.cliente?.nome },
            prioridade: { value: selectedProtocol.prioridade?.id, label: selectedProtocol.prioridade?.nome },
            previsao: moment(selectedProtocol.previsao).format('yyyy-MM-DDThh:mm'),
        });
    }

    async function editProtocol(evt) {
        evt.preventDefault();

        const data = {
            id: localSelectedProtocol.id,
            cliente: localSelectedProtocol.cliente.value,
            prioridade: localSelectedProtocol.prioridade.value,
            setor: selectedProtocol.setor.value,
            pessoaatendida: localSelectedProtocol.pessoaatendida,
            motivo: localSelectedProtocol.motivo,
            previsao: localSelectedProtocol.previsao,
            situacao: selectedProtocol.situacao,
            uid: user.uid,
            empresa: company.companyData.id,
        };
        console.log('editar');
        console.log(data);
        await dispatch(updateProtocol(data));
        setTimeout(() => {
            handleCancelProtocol();
        }, 1000);
    }
    return (
        <DelailsFormWrapper
            onSubmit={(evt) => {
                editProtocol(evt);
            }}
        >
            {!selectedProtocol ? (
                <LoadingGif className="loading" />
            ) : (
                <>
                    <Cabecalho>
                        <span>Protocolo id: {selectedProtocol?.id}</span>
                        <span>
                            Setor: {selectedProtocol.setor?.id} - {selectedProtocol.setor?.nome}
                        </span>
                        <span>
                            Atendente : {selectedProtocol.atendente?.id} - {selectedProtocol.atendente?.nome}
                        </span>
                        <span>Situação: {selectedProtocol.situacao === 'A' ? 'Aberto' : 'Concluido'}</span>
                    </Cabecalho>
                    <DisplayWrapper>
                        <DropboxWrapper>
                            <Dropbox
                                label="Cliente:"
                                options={customerOptions}
                                ocHandler={(value) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, cliente: value });
                                }}
                                inputValue={localSelectedProtocol?.cliente}
                                search={true}
                            />
                        </DropboxWrapper>
                        <InputWrapper>
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
                        </InputWrapper>
                        <InputWrapper>
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
                        </InputWrapper>
                        <DropboxWrapper>
                            <Dropbox
                                label="Prioridade:"
                                options={priorityOptions}
                                ocHandler={(value) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, prioridade: value });
                                }}
                                inputValue={localSelectedProtocol?.prioridade}
                                search={true}
                            />
                        </DropboxWrapper>
                        <InputWrapper>
                            <Input
                                label="Previsão:"
                                noMargin={true}
                                type="datetime-local"
                                placeholder="Título do atendimento"
                                inputValue={localSelectedProtocol?.previsao}
                                isValid={null}
                                ocHandler={(e) => {
                                    setLocalSelectedProtocol({ ...localSelectedProtocol, previsao: e.target.value });
                                }}
                            />
                        </InputWrapper>
                    </DisplayWrapper>
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
                        Editar
                    </BtSubmit>
                </>
            )}
        </DelailsFormWrapper>
    );
}
export default Overview;
